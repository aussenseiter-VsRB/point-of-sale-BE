const express = require('express')
const router = express.Router()

const kasirController = require('../controllers/kasir.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, kasirController.getAll)
router.get('/with-sales', authMiddleware, kasirController.getAllWithSales)
router.get('/user/:user_id', authMiddleware, kasirController.getByUser)
router.get('/:id', authMiddleware, kasirController.getById)
router.post('/', authMiddleware, roleMiddleware('admin'), kasirController.create)
router.put('/:id', authMiddleware, roleMiddleware('admin'), kasirController.update)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), kasirController.delete)

module.exports = router