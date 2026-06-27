const asyncHandler = require('../utils/asyncHandler')
const couponService = require('../services/coupon.service')

exports.getAll = asyncHandler(async (req, res) => {
  const data = await couponService.getAll()
  res.json(data)
})

exports.getById = asyncHandler(async (req, res) => {
  const data = await couponService.getById(req.params.id)
  res.json(data)
})

exports.create = asyncHandler(async (req, res) => {
  const data = await couponService.create(req.body)
  res.status(201).json(data)
})

exports.update = asyncHandler(async (req, res) => {
  const data = await couponService.update(req.params.id, req.body)
  res.json(data)
})

exports.delete = asyncHandler(async (req, res) => {
  await couponService.delete(req.params.id)
  res.json({ message: 'Coupon deleted' })
})

exports.validate = asyncHandler(async (req, res) => {
  const { code } = req.body
  const coupon = await couponService.validate(code)
  res.json(coupon)
})
