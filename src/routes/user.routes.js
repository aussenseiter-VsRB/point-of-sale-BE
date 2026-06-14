const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.get('/', authMiddleware, roleMiddleware('admin'), userController.getAll)
router.get('/:id', authMiddleware, roleMiddleware('admin'), userController.getById)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), userController.delete)

module.exports = router