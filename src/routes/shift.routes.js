const express = require('express')
const router = express.Router()
const shiftController = require('../controllers/shift.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.post('/open', authMiddleware, shiftController.open)
router.post('/close/:id', authMiddleware, shiftController.close)
router.get('/my-open', authMiddleware, shiftController.getMyOpen)
router.get('/', authMiddleware, roleMiddleware('admin'), shiftController.getAll)
router.get('/kasir/:kasirId', authMiddleware, shiftController.getByKasir)

module.exports = router
