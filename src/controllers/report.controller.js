const asyncHandler = require('../utils/asyncHandler')
const reportService = require('../services/report.service')

exports.dailyItem = asyncHandler(async (req, res) => {
  const id_kasir = req.query.kasir_id || null
  const date = req.query.date
  const data = await reportService.getDailyItemReport(id_kasir, date)
  res.json(data)
})

exports.dailyProfit = asyncHandler(async (req, res) => {
  const id_kasir = req.query.kasir_id || null
  const date = req.query.date
  const data = await reportService.getDailyProfit(id_kasir, date)
  res.json(data)
})

exports.weekly = asyncHandler(async (req, res) => {
  const id_kasir = req.query.kasir_id || null
  const data = await reportService.getWeeklyReport(id_kasir)
  res.json(data)
})

exports.monthly = asyncHandler(async (req, res) => {
  const id_kasir = req.query.kasir_id || null
  const data = await reportService.getMonthlyReport(id_kasir)
  res.json(data)
})
