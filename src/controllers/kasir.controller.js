const asyncHandler = require('../utils/asyncHandler')
const kasirService = require('../services/kasir.service')

exports.getAll = asyncHandler(async (req, res) => {
  const kasirs = await kasirService.getAllKasir()
  res.json(kasirs)
})

exports.getById = asyncHandler(async (req, res) => {
  const kasir = await kasirService.getKasirById(req.params.id)
  res.json(kasir)
})

exports.getByUser = asyncHandler(async (req, res) => {
  const kasir = await kasirService.getKasirByUserId(req.params.user_id)
  res.json(kasir)
})

exports.create = asyncHandler(async (req, res) => {
  const kasir = await kasirService.createKasir(req.body)
  res.status(201).json(kasir)
})

exports.update = asyncHandler(async (req, res) => {
  const kasir = await kasirService.updateKasir(req.params.id, req.body.modal)
  res.json(kasir)
})

exports.getAllWithSales = asyncHandler(async (req, res) => {
  const data = await kasirService.getAllKasirWithSales()
  res.json(data)
})

exports.delete = asyncHandler(async (req, res) => {
  await kasirService.deleteKasir(req.params.id)
  res.json({ message: 'Kasir deleted' })
})
