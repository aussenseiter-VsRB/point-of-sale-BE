const bcrypt = require('bcrypt')
const AppError = require('../errors/AppError')
const userModel = require('../models/user.model')
const passwordHistoryModel = require('../models/passwordHistory.model')

exports.getAllUsers = async () => {
  return await userModel.findAll()
}

exports.getUserById = async (id) => {
  const user = await userModel.findById(id)
  if (!user) throw new AppError('USER_NOT_FOUND', 404)
  return user
}

exports.deleteUser = async (id) => {
  const user = await userModel.findById(id)
  if (!user) throw new AppError('USER_NOT_FOUND', 404)
  await userModel.deleteById(id)
}

exports.changeOwnPassword = async (userId, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    throw new AppError('CURRENT_PASSWORD_AND_NEW_PASSWORD_REQUIRED', 400)
  }
  if (newPassword.length < 6) {
    throw new AppError('PASSWORD_MIN_6_CHARACTERS', 400)
  }

  const user = await userModel.findByIdWithPassword(userId)
  if (!user) throw new AppError('USER_NOT_FOUND', 404)

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) throw new AppError('CURRENT_PASSWORD_INCORRECT', 401)

  const hashed = await bcrypt.hash(newPassword, 10)
  await userModel.updatePassword(userId, hashed)
  await passwordHistoryModel.create(userId, userId)
}

exports.changeUserPassword = async (adminId, targetUserId, newPassword) => {
  if (!newPassword) throw new AppError('NEW_PASSWORD_REQUIRED', 400)
  if (newPassword.length < 6) throw new AppError('PASSWORD_MIN_6_CHARACTERS', 400)

  const user = await userModel.findById(targetUserId)
  if (!user) throw new AppError('USER_NOT_FOUND', 404)

  const hashed = await bcrypt.hash(newPassword, 10)
  await userModel.updatePassword(targetUserId, hashed)
  await passwordHistoryModel.create(targetUserId, adminId)
}