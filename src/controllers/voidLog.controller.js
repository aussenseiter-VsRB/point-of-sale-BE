const asyncHandler = require('../utils/asyncHandler')
const voidLogService = require('../services/voidLog.service')

exports.getAll = asyncHandler(async (req, res) => {
  const logs = await voidLogService.getAll()
  res.json(logs)
})

exports.getByTransaksi = asyncHandler(async (req, res) => {
  const log = await voidLogService.getByTransaksi(req.params.transaksiId)
  res.json(log)
})
