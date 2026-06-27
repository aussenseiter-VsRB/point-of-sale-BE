const express = require('express')
const router = express.Router()
const couponController = require('../controllers/coupon.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, roleMiddleware('admin'), couponController.getAll)
router.get('/:id', authMiddleware, roleMiddleware('admin'), couponController.getById)
router.post('/', authMiddleware, roleMiddleware('admin'), couponController.create)
router.put('/:id', authMiddleware, roleMiddleware('admin'), couponController.update)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), couponController.delete)
router.post('/validate', authMiddleware, couponController.validate)

module.exports = router
