const express = require('express')
const router = express.Router()
const passwordHistoryController = require('../controllers/passwordHistory.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, roleMiddleware('admin'), passwordHistoryController.getAll)

module.exports = router
