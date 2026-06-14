const asyncHandler = require('../utils/asyncHandler')
const cashReconciliationService = require('../services/cashReconciliation.service')

exports.submit = asyncHandler(async (req, res) => {
  const { shift_id, actual_cash, note } = req.body
  const data = await cashReconciliationService.submit(shift_id, actual_cash, note, req.user.id, req.user.role)
  res.status(201).json(data)
})

exports.getAll = asyncHandler(async (req, res) => {
  const data = await cashReconciliationService.getAll()
  res.json(data)
})

exports.getByShift = asyncHandler(async (req, res) => {
  const data = await cashReconciliationService.getByShift(req.params.shiftId)
  res.json(data)
})
