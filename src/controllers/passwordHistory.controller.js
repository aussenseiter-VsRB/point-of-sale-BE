const asyncHandler = require('../utils/asyncHandler')
const passwordHistoryService = require('../services/passwordHistory.service')

exports.getAll = asyncHandler(async (req, res) => {
  const data = await passwordHistoryService.getAll()
  res.json(data)
})
