const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AppError = require('../errors/AppError')
const userModel = require('../models/user.model')

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

  return { token }
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

