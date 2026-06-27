const asyncHandler = require('../utils/asyncHandler')
const transaksiService = require('../services/transaksi.service')

exports.getAll = asyncHandler(async (req, res) => {
  const data = await transaksiService.getAll()
  res.json(data)
})

exports.getById = asyncHandler(async (req, res) => {
  const data = await transaksiService.getById(req.params.id)
  res.json(data)
})

exports.getByKasir = asyncHandler(async (req, res) => {
  const data = await transaksiService.getByKasir(req.params.kasirId)
  res.json(data)
})

exports.create = asyncHandler(async (req, res) => {
  const { id_kasir, items, discount_amount, discount_reason, discount_approved_by, coupon_code } = req.body
  const data = await transaksiService.create(id_kasir, items, discount_amount, discount_reason, discount_approved_by, coupon_code)
  res.status(201).json(data)
})

exports.delete = asyncHandler(async (req, res) => {
  await transaksiService.softDelete(req.params.id, req.body.reason, req.user.id)
  res.json({ message: 'Transaksi deleted' })
})

exports.getInvoice = asyncHandler(async (req, res) => {
  const data = await transaksiService.getById(req.params.id)
  res.json(data)
})

exports.getDiscounted = asyncHandler(async (req, res) => {
  const data = await transaksiService.getDiscounted()
  res.json(data)
})
