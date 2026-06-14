const AppError = require('../errors/AppError')
const shiftModel = require('../models/shift.model')
const kasirModel = require('../models/kasir.model')

exports.openShift = async (userId) => {
  const kasir = await kasirModel.findByUserId(userId)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)

  const openShift = await shiftModel.findOpenByKasir(kasir.id)
  if (openShift) throw new AppError('SHIFT_ALREADY_OPEN', 409)

  return await shiftModel.create(kasir.id, userId)
}

exports.closeShift = async (id, userId, userRole) => {
  const shift = await shiftModel.findById(id)
  if (!shift) throw new AppError('SHIFT_NOT_FOUND', 404)

  if (shift.status !== 'open') throw new AppError('SHIFT_ALREADY_CLOSED', 400)

  if (userRole !== 'admin' && shift.opened_by !== userId) {
    throw new AppError('FORBIDDEN: not your shift', 403)
  }

  return await shiftModel.close(id)
}

exports.getAllShifts = async () => {
  return await shiftModel.findAll()
}

exports.getShiftsByKasir = async (kasirId) => {
  const kasir = await kasirModel.findById(kasirId)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return await shiftModel.findByKasir(kasirId)
}
