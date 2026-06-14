const AppError = require('../errors/AppError')
const voidLogModel = require('../models/voidLog.model')

exports.getAll = async () => {
  return await voidLogModel.findAll()
}

exports.getByTransaksi = async (transaksiId) => {
  const log = await voidLogModel.findByTransaksi(transaksiId)
  if (!log) throw new AppError('VOID_LOG_NOT_FOUND', 404)
  return log
}
