const express = require('express')
const router = express.Router()
const voidLogController = require('../controllers/voidLog.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, roleMiddleware('admin'), voidLogController.getAll)
router.get('/transaksi/:transaksiId', authMiddleware, roleMiddleware('admin'), voidLogController.getByTransaksi)

module.exports = router
