const express = require('express')
const AppError = require('./errors/AppError')
const app = express()

app.use(express.json())

// ROUTES
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const produkRoutes = require('./routes/produk.routes')
const kasirRoutes = require('./routes/kasir.routes')
const transaksiRoutes = require('./routes/transaksi.routes')
const reportRoutes = require('./routes/report.routes')
const stokMasukRoutes = require('./routes/stokMasuk.routes')
const shiftRoutes = require('./routes/shift.routes')
const cashReconciliationRoutes = require('./routes/cashReconciliation.routes')
const voidLogRoutes = require('./routes/voidLog.routes')
const passwordHistoryRoutes = require('./routes/passwordHistory.routes')

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/password-history', passwordHistoryRoutes)
app.use('/produk', produkRoutes)
app.use('/kasir', kasirRoutes)
app.use('/transaksi', transaksiRoutes)
app.use('/report', reportRoutes)
app.use('/stok-masuk', stokMasukRoutes)
app.use('/shift', shiftRoutes)
app.use('/reconciliation', cashReconciliationRoutes)
app.use('/void-log', voidLogRoutes)

app.get('/', (req, res) => {
  res.send('Hello Express')
})

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err)
  if (err instanceof AppError) {
    return res.status(err.statusCode || 500).json({ message: err.message })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'INVALID_TOKEN' })
  }

  res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' })
})

module.exports = app
