const AppError = require('../errors/AppError')
const produkModel = require('../models/produk.models')

exports.getAllProduk = async () => {
  return await produkModel.findAll()
}

exports.getProdukById = async (id) => {
  const produk = await produkModel.findById(id)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)
  return produk
}

exports.getProdukByBarcode = async (barcode) => {
  const produk = await produkModel.findByBarcode(barcode)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)
  return produk
}

exports.createProduk = async (data) => {
  if (!data.barcode || !data.nama_produk || !data.harga) {
    throw new AppError('INVALID_PAYLOAD', 400)
  }

  const existingByBarcode = await produkModel.findByBarcode(data.barcode)
  if (existingByBarcode) {
    throw new AppError('BARCODE_ALREADY_EXISTS', 409)
  }

  return await produkModel.create(data)
}

exports.updateProduk = async (id, data) => {
  const produk = await produkModel.findById(id)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)
  return await produkModel.update(id, data)
}

exports.deleteProduk = async (id) => {
  const produk = await produkModel.findById(id)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)
  await produkModel.softDelete(id)
}
