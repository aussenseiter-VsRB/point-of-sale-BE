const asyncHandler = require('../utils/asyncHandler')
const produkService = require('../services/produk.service')

exports.getAll = asyncHandler(async (req, res) => {
  const produk = await produkService.getAllProduk()
  res.json(produk)
})

exports.getById = asyncHandler(async (req, res) => {
  const produk = await produkService.getProdukById(req.params.id)
  res.json(produk)
})

exports.getByBarcode = asyncHandler(async (req, res) => {
  const produk = await produkService.getProdukByBarcode(req.params.barcode)
  res.json(produk)
})

exports.create = asyncHandler(async (req, res) => {
  const produk = await produkService.createProduk(req.body)
  res.status(201).json(produk)
})

exports.update = asyncHandler(async (req, res) => {
  const produk = await produkService.updateProduk(req.params.id, req.body)
  res.json(produk)
})

exports.softDelete = asyncHandler(async (req, res) => {
  await produkService.deleteProduk(req.params.id)
  res.json({ message: 'Produk deleted' })
})
