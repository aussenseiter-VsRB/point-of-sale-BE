const AppError = require('../errors/AppError')
const couponModel = require('../models/coupon.model')

exports.getAll = async () => {
  return await couponModel.findAll()
}

exports.getById = async (id) => {
  const coupon = await couponModel.findById(id)
  if (!coupon) throw new AppError('COUPON_NOT_FOUND', 404)
  return coupon
}

exports.create = async (data) => {
  const existing = await couponModel.findByCode(data.code)
  if (existing) throw new AppError('COUPON_CODE_EXISTS', 409)
  if (!data.code || data.code.trim() === '') throw new AppError('COUPON_CODE_REQUIRED', 400)
  if (!data.discount_amount || Number(data.discount_amount) <= 0) throw new AppError('INVALID_DISCOUNT_AMOUNT', 400)
  return await couponModel.create(data)
}

exports.update = async (id, data) => {
  const coupon = await couponModel.findById(id)
  if (!coupon) throw new AppError('COUPON_NOT_FOUND', 404)
  const existing = await couponModel.findByCode(data.code)
  if (existing && existing.id !== id) throw new AppError('COUPON_CODE_EXISTS', 409)
  return await couponModel.update(id, data)
}

exports.delete = async (id) => {
  const coupon = await couponModel.findById(id)
  if (!coupon) throw new AppError('COUPON_NOT_FOUND', 404)
  await couponModel.softDelete(id)
}

exports.validate = async (code) => {
  if (!code || code.trim() === '') throw new AppError('COUPON_CODE_REQUIRED', 400)
  const coupon = await couponModel.findByCode(code.trim())
  if (!coupon) throw new AppError('COUPON_NOT_FOUND', 404)
  if (!coupon.is_active) throw new AppError('COUPON_INACTIVE', 400)
  return coupon
}
