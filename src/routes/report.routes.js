const express = require('express')
const router = express.Router()

const reportController = require('../controllers/report.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/daily', authMiddleware, roleMiddleware('admin'), reportController.dailyItem)
router.get('/daily-profit', authMiddleware, roleMiddleware('admin'), reportController.dailyProfit)
router.get('/weekly', authMiddleware, roleMiddleware('admin'), reportController.weekly)
router.get('/monthly', authMiddleware, roleMiddleware('admin'), reportController.monthly)

module.exports = router
