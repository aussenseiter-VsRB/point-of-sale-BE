const AppError = require('../errors/AppError')

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('UNAUTHORIZED', 401))
    }

    const userRole = req.user.role
    if (!allowedRoles.includes(userRole)) {
      return next(new AppError('FORBIDDEN: insufficient permissions', 403))
    }

    next()
  }
}

module.exports = roleMiddleware
