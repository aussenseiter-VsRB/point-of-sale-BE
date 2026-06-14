const express = require('express')
const router = express.Router()
const transaksiController = require('../controllers/transaksi.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, transaksiController.getAll)
router.get('/discounted', authMiddleware, roleMiddleware('admin'), transaksiController.getDiscounted)
router.get('/kasir/:kasirId', authMiddleware, transaksiController.getByKasir)
router.get('/:id', authMiddleware, transaksiController.getById)
router.post('/', authMiddleware, transaksiController.create)
router.delete('/:id', authMiddleware, transaksiController.delete)

module.exports = router