const express = require('express')
const router = express.Router()
const stokMasukController = require('../controllers/stokMasuk.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, roleMiddleware('admin'), stokMasukController.getAll)
router.get('/produk/:id_produk', authMiddleware, roleMiddleware('admin'), stokMasukController.getByProduk)
router.post('/', authMiddleware, roleMiddleware('admin'), stokMasukController.create)

module.exports = router
