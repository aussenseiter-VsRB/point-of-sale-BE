const express = require('express')
const router = express.Router()

const produkController = require('../controllers/produk.controller')
const generateBarcode = require('../middlewares/barCode.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, produkController.getAll)
router.get('/barcode/:barcode', authMiddleware, produkController.getByBarcode)
router.get('/:id', authMiddleware, produkController.getById)
router.post('/', authMiddleware, roleMiddleware('admin'), generateBarcode, produkController.create)
router.put('/:id', authMiddleware, roleMiddleware('admin'), produkController.update)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), produkController.softDelete)

module.exports = router