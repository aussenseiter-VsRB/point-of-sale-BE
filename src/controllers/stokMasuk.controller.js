const asyncHandler = require('../utils/asyncHandler')
const stokMasukService = require('../services/stokMasuk.service')

exports.getAll = asyncHandler(async (req, res) => {
  const data = await stokMasukService.getAll()
  res.json(data)
})

exports.getByProduk = asyncHandler(async (req, res) => {
  const data = await stokMasukService.getByProduk(req.params.id_produk)
  res.json(data)
})

exports.create = asyncHandler(async (req, res) => {
  const data = await stokMasukService.create(req.body, req.user.id)
  res.status(201).json(data)
})
