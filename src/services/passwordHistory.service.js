const passwordHistoryModel = require('../models/passwordHistory.model')

exports.getAll = async () => {
  return await passwordHistoryModel.findAll()
}
