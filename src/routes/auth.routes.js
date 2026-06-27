const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')
const authController = require('../controllers/auth.controller')

router.post('/register', authMiddleware, roleMiddleware('admin'), authController.register)
router.post('/login', authController.login)
router.post('/logout', authMiddleware, authController.logout)
router.post('/reset-password', authController.resetPassword)

module.exports = router