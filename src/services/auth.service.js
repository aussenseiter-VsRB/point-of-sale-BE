const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AppError = require('../errors/AppError')
const userModel = require('../models/user.model')
const passwordHistoryModel = require('../models/passwordHistory.model')

exports.login = async (username, password) => {
  if (!username || !password) {
    throw new AppError('USERNAME_PASSWORD_REQUIRED', 400)
  }

  const user = await userModel.findByUsername(username)

  if (!user) {
    throw new AppError('INVALID_CREDENTIALS', 401)
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new AppError('INVALID_CREDENTIALS', 401)
  }

  const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
  )

  return { token, user: { id: user.id, username: user.username, role: user.role } }
}

exports.resetPassword = async (username, currentPassword, newPassword) => {
  if (!username || !currentPassword || !newPassword) {
    throw new AppError('USERNAME_CURRENT_PASSWORD_NEW_PASSWORD_REQUIRED', 400)
  }
  if (newPassword.length < 6) {
    throw new AppError('PASSWORD_MIN_6_CHARACTERS', 400)
  }

  const user = await userModel.findByUsername(username)
  if (!user) {
    throw new AppError('USER_NOT_FOUND', 404)
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    throw new AppError('CURRENT_PASSWORD_INCORRECT', 401)
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await userModel.updatePassword(user.id, hashedPassword)
  await passwordHistoryModel.create(user.id, user.id)

  return { id: user.id, username: user.username }
}

exports.register = async ({ username, password, role = 'user' }) => {
  if (!username || !password) {
    throw new AppError('USERNAME_PASSWORD_REQUIRED', 400)
  }

  const existing = await userModel.findByUsername(username)
  if (existing) {
    throw new AppError('USERNAME_ALREADY_EXISTS', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: require('uuid').v4(),
    username,
    password: hashedPassword,
    role
  }

  await userModel.create(newUser)
  const created = await userModel.findById(newUser.id)
  return created
}

