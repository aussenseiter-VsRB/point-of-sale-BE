const asyncHandler = require('../utils/asyncHandler')
const userService = require('../services/user.service')

exports.getAll = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers()
  res.json(users)
})

exports.getById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id)
  res.json(user)
})

exports.delete = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id)
  res.json({ message: 'User deleted' })
})

exports.changeOwnPassword = asyncHandler(async (req, res) => {
  const { current_password, new_password } = req.body
  await userService.changeOwnPassword(req.user.id, current_password, new_password)
  res.json({ message: 'Password changed' })
})

exports.changeUserPassword = asyncHandler(async (req, res) => {
  const { new_password } = req.body
  await userService.changeUserPassword(req.user.id, req.params.id, new_password)
  res.json({ message: 'Password changed' })
})