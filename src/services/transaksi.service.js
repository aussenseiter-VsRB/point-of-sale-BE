const AppError = require('../errors/AppError')
const transaksiModel = require('../models/transaksi.model')
const itemTransaksiModel = require('../models/itemTransaksi.model')
const produkModel = require('../models/produk.models')
const kasirModel = require('../models/kasir.model')
const userModel = require('../models/user.model')
const voidLogModel = require('../models/voidLog.model')

exports.getAll = async () => {
  return await transaksiModel.findAll()
}

exports.getById = async (id) => {
  const transaksi = await transaksiModel.findById(id)
  if (!transaksi) throw new AppError('TRANSAKSI_NOT_FOUND', 404)
  const items = await itemTransaksiModel.findByTransaksi(id)
  return { ...transaksi, items }
}

exports.getByKasir = async (id_kasir) => {
  const kasir = await kasirModel.findById(id_kasir)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return await transaksiModel.findByKasir(id_kasir)
}

function generateInvoiceNumber() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const dateStr = `${year}${month}${day}`
  return { dateStr, prefix: `INV-${dateStr}-` }
}

exports.create = async (id_kasir, items, discount_amount, discount_reason, discount_approved_by) => {
  if (!id_kasir || !Array.isArray(items) || items.length === 0) {
    throw new AppError('INVALID_PAYLOAD', 400)
  }

  const kasir = await kasirModel.findById(id_kasir)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)

  let subtotal = 0

  for (const item of items) {
    const produk = await produkModel.findById(item.id_produk)
    if (!produk) throw new AppError(`PRODUK_NOT_FOUND: ${item.id_produk}`, 404)
    if (produk.stok < item.jumlah) {
      throw new AppError(`INSUFFICIENT_STOCK for ${produk.nama_produk}`, 400)
    }
    subtotal += Number(produk.harga) * Number(item.jumlah)
  }

  const discAmount = Number(discount_amount) || 0
  let total_harga = subtotal

  if (discAmount > 0) {
    if (discAmount > subtotal) {
      throw new AppError('DISCOUNT_EXCEEDS_SUBTOTAL', 400)
    }

    const tenPercent = subtotal * 0.1
    if (discAmount > tenPercent) {
      if (!discount_approved_by) {
        throw new AppError('DISCOUNT_APPROVAL_REQUIRED', 403)
      }
      const approver = await userModel.findById(discount_approved_by)
      if (!approver || approver.role !== 'admin') {
        throw new AppError('INVALID_APPROVER', 403)
      }
    }

    total_harga = subtotal - discAmount
  }

  const transaksi = await transaksiModel.create(id_kasir, total_harga, discAmount, discount_reason || null, discount_approved_by || null)

  const { dateStr, prefix } = generateInvoiceNumber()
  const lastInvoice = await transaksiModel.getLastInvoiceNumberToday()
  let seq = 1
  if (lastInvoice && lastInvoice.startsWith(prefix)) {
    seq = parseInt(lastInvoice.slice(prefix.length), 10) + 1
  }
  const invoice_number = `${prefix}${String(seq).padStart(4, '0')}`
  await transaksiModel.updateInvoiceNumber(transaksi.id, invoice_number)

  for (const item of items) {
    const produk = await produkModel.findById(item.id_produk)
    await itemTransaksiModel.create(transaksi.id, item.id_produk, item.jumlah, produk.harga)
    await produkModel.updateStok(item.id_produk, produk.stok - item.jumlah)
  }

  return await exports.getById(transaksi.id)
}

exports.softDelete = async (id, reason, voidedBy) => {
  if (!reason || reason.trim() === '') {
    throw new AppError('VOID_REASON_REQUIRED', 400)
  }

  const transaksi = await transaksiModel.findById(id)
  if (!transaksi) throw new AppError('TRANSAKSI_NOT_FOUND', 404)

  await voidLogModel.create({
    transaksi_id: id,
    voided_by: voidedBy,
    reason
  })

  await transaksiModel.softDelete(id)
}

exports.getDiscounted = async () => {
  return await transaksiModel.findDiscounted()
}
