const express = require('express')
const router = express.Router()
const cashReconciliationController = require('../controllers/cashReconciliation.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.post('/', authMiddleware, cashReconciliationController.submit)
router.get('/', authMiddleware, cashReconciliationController.getAll)
router.get('/shift/:shiftId', authMiddleware, roleMiddleware('admin'), cashReconciliationController.getByShift)

module.exports = router
