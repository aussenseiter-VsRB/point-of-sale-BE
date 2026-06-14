const express = require('express')
const router = express.Router()

const reportController = require('../controllers/report.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/daily/:kasirId', authMiddleware, roleMiddleware('admin'), reportController.dailyItem)
router.get('/daily-profit/:kasirId', authMiddleware, roleMiddleware('admin'), reportController.dailyProfit)
router.get('/monthly/:kasirId', authMiddleware, roleMiddleware('admin'), reportController.monthly)

module.exports = router