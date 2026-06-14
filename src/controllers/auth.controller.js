const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/auth.service')

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const result = await authService.login(username, password)

  res.json({
    message: 'login success',
    token: result.token
  })
})

exports.register = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body
  const user = await authService.register({ username, password, role })
  res.status(201).json({
    message: 'register success',
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  })
})

exports.logout = asyncHandler(async (req, res) => {
  res.json({
    message: 'logout success'
  })
})
    