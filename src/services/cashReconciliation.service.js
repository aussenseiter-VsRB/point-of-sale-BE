const AppError = require('../errors/AppError')
const cashReconciliationModel = require('../models/cashReconciliation.model')
const shiftModel = require('../models/shift.model')
const transaksiModel = require('../models/transaksi.model')
const kasirModel = require('../models/kasir.model')

exports.submit = async (shiftId, actualCash, note, userId, userRole) => {
  if (!shiftId || actualCash === undefined || actualCash === null) {
    throw new AppError('INVALID_PAYLOAD: shift_id and actual_cash are required', 400)
  }

  const shift = await shiftModel.findById(shiftId)
  if (!shift) throw new AppError('SHIFT_NOT_FOUND', 404)

  if (userRole !== 'admin') {
    const kasir = await kasirModel.findByUserId(userId)
    if (!kasir || kasir.id !== shift.kasir_id) {
      throw new AppError('FORBIDDEN: not your shift', 403)
    }
  }

  const existing = await cashReconciliationModel.findByShift(shiftId)
  if (existing) throw new AppError('RECONCILIATION_ALREADY_EXISTS', 409)

  const totalRow = await transaksiModel.sumTotalByShift(shiftId)
  const expectedCash = totalRow ? Number(totalRow.total) : 0
  const actualCashNum = Number(actualCash)
  const discrepancy = actualCashNum - expectedCash

  const data = await cashReconciliationModel.create({
    shift_id: shiftId,
    kasir_id: shift.kasir_id,
    expected_cash: expectedCash,
    actual_cash: actualCashNum,
    discrepancy,
    note: note || null
  })

  if (shift.status === 'open') {
    await shiftModel.close(shiftId)
  }

  return data
}

exports.getAll = async () => {
  return await cashReconciliationModel.findAll()
}

exports.getByShift = async (shiftId) => {
  const shift = await shiftModel.findById(shiftId)
  if (!shift) throw new AppError('SHIFT_NOT_FOUND', 404)

  const data = await cashReconciliationModel.findByShift(shiftId)
  if (!data) throw new AppError('RECONCILIATION_NOT_FOUND', 404)
  return data
}
