const asyncHandler = require('../utils/asyncHandler')
const shiftService = require('../services/shift.service')

exports.open = asyncHandler(async (req, res) => {
  const shift = await shiftService.openShift(req.user.id)
  res.status(201).json(shift)
})

exports.close = asyncHandler(async (req, res) => {
  const shift = await shiftService.closeShift(req.params.id, req.user.id, req.user.role)
  res.json(shift)
})

exports.getAll = asyncHandler(async (req, res) => {
  const shifts = await shiftService.getAllShifts()
  res.json(shifts)
})

exports.getByKasir = asyncHandler(async (req, res) => {
  const shifts = await shiftService.getShiftsByKasir(req.params.kasirId)
  res.json(shifts)
})
