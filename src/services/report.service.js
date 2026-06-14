const AppError = require('../errors/AppError')
const reportModel = require('../models/report.model')
const kasirModel = require('../models/kasir.model')

exports.getDailyItemReport = async (id_kasir, date) => {
  const kasir = await kasirModel.findById(id_kasir)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  if (!date) throw new AppError('DATE_REQUIRED', 400)
  return await reportModel.getDailyItemReport(id_kasir, date)
}

exports.getDailyProfit = async (id_kasir, date) => {
  const kasir = await kasirModel.findById(id_kasir)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  if (!date) throw new AppError('DATE_REQUIRED', 400)
  return await reportModel.getDailyProfit(id_kasir, date)
}

exports.getMonthlyReport = async (id_kasir) => {
  const kasir = await kasirModel.findById(id_kasir)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return await reportModel.getMonthlyReport(id_kasir)
}
