const AppError = require('../errors/AppError')
const kasirModel = require('../models/kasir.model')

exports.getAllKasir = async () => {
  return await kasirModel.findAll()
}

exports.getKasirById = async (id) => {
  const kasir = await kasirModel.findById(id)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return kasir
}

exports.getKasirByUserId = async (user_id) => {
  const kasir = await kasirModel.findByUserId(user_id)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return kasir
}

exports.createKasir = async (data) => {
  return await kasirModel.create(data)
}

exports.updateKasir = async (id, modal) => {
  const kasir = await kasirModel.findById(id)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  return await kasirModel.updateModal(id, modal)
}

exports.getAllKasirWithSales = async () => {
  return await kasirModel.findAllWithTodaySales()
}

exports.deleteKasir = async (id) => {
  const kasir = await kasirModel.findById(id)
  if (!kasir) throw new AppError('KASIR_NOT_FOUND', 404)
  await kasirModel.softDelete(id)
}
