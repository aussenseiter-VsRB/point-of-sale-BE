// models/transaksiModel.js
const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(
    `SELECT t.id, t.invoice_number, t.total_harga, t.created_at,
            t.discount_amount, t.discount_reason, t.discount_approved_by,
            users.username AS nama_kasir
     FROM transaksi t
     JOIN kasir k ON k.id = t.id_kasir
     JOIN users ON users.id = k.user_id
     WHERE t.deleted_at IS NULL
     ORDER BY t.created_at DESC`
  )
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT t.id, t.invoice_number, t.total_harga, t.created_at,
            t.discount_amount, t.discount_reason, t.discount_approved_by,
            t.coupon_id, c.code AS coupon_code,
            users.username AS nama_kasir
     FROM transaksi t
     JOIN kasir k ON k.id = t.id_kasir
     JOIN users ON users.id = k.user_id
     LEFT JOIN coupons c ON c.id = t.coupon_id
     WHERE t.id = ? AND t.deleted_at IS NULL`,
    [id]
  )
  return rows[0] || null
}

exports.findByKasir = async (id_kasir) => {
  const [rows] = await db.query(
    `SELECT t.id, t.invoice_number, t.total_harga, t.created_at,
            t.discount_amount, t.discount_reason, t.discount_approved_by,
            users.username AS nama_kasir
     FROM transaksi t
     JOIN kasir k ON k.id = t.id_kasir
     JOIN users ON users.id = k.user_id
     WHERE t.id_kasir = ? AND t.deleted_at IS NULL
     ORDER BY t.created_at DESC`,
    [id_kasir]
  )
  return rows
}

exports.findWithItems = async (id) => {
  const [rows] = await db.query(
    `SELECT t.id AS id_transaksi, t.total_harga, t.created_at,
            users.username AS nama_kasir,
            p.nama_produk, p.barcode, p.harga,
            it.jumlah,
            (it.jumlah * p.harga) AS subtotal
     FROM transaksi t
     JOIN kasir k ON k.id = t.id_kasir
     JOIN users ON users.id = k.user_id
     JOIN item_transaksi it ON it.id_transaksi = t.id
     JOIN produk p ON p.id = it.id_produk
     WHERE t.id = ? AND t.deleted_at IS NULL`,
    [id]
  )
  return rows
}

exports.create = async (id_kasir, total_harga, discount_amount, discount_reason, discount_approved_by, shift_id, coupon_id) => {
  const id = uuidv4()
  await db.query(
    `INSERT INTO transaksi (id, id_kasir, total_harga, discount_amount, discount_reason, discount_approved_by, shift_id, coupon_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, id_kasir, total_harga, discount_amount || 0, discount_reason || null, discount_approved_by || null, shift_id || null, coupon_id || null]
  )
  return exports.findById(id)
}

exports.updateInvoiceNumber = async (id, invoice_number) => {
  await db.query(
    `UPDATE transaksi SET invoice_number = ? WHERE id = ?`,
    [invoice_number, id]
  )
}

exports.getLastInvoiceNumberToday = async () => {
  const today = new Date()
  const dateStr = today.toISOString().slice(0, 10)
  const [rows] = await db.query(
    `SELECT invoice_number FROM transaksi
     WHERE invoice_number LIKE CONCAT('INV-', REPLACE(?, '-', ''), '-%')
       AND deleted_at IS NULL
     ORDER BY created_at DESC
     LIMIT 1`,
    [dateStr]
  )
  return rows[0]?.invoice_number || null
}

exports.softDelete = async (id) => {
  await db.query(`UPDATE transaksi SET deleted_at = NOW() WHERE id = ?`, [id])
}

exports.sumTotalByShift = async (shiftId) => {
  const [rows] = await db.query(
    `SELECT SUM(total_harga) AS total FROM transaksi WHERE shift_id = ? AND deleted_at IS NULL`,
    [shiftId]
  )
  return rows[0]
}

exports.findDiscounted = async () => {
  const [rows] = await db.query(
    `SELECT t.id, t.invoice_number, t.total_harga, t.discount_amount, t.discount_reason, t.discount_approved_by,
            t.created_at, users.username AS nama_kasir,
            approver.username AS approved_by_username
     FROM transaksi t
     JOIN kasir k ON k.id = t.id_kasir
     JOIN users ON users.id = k.user_id
     LEFT JOIN users approver ON approver.id = t.discount_approved_by
     WHERE t.deleted_at IS NULL AND t.discount_amount > 0
     ORDER BY t.discount_amount DESC`
  )
  return rows
}