const express = require('express')
const router = express.Router()
const stokMasukController = require('../controllers/stokMasuk.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, stokMasukController.getAll)
router.get('/produk/:id_produk', authMiddleware, stokMasukController.getByProduk)
router.post('/', authMiddleware, stokMasukController.create)

module.exports = router
