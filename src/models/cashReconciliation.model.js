const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT cr.*, u.username AS kasir_username
    FROM cash_reconciliation cr
    JOIN kasir k ON k.id = cr.kasir_id
    JOIN users u ON u.id = k.user_id
    ORDER BY cr.created_at DESC
  `)
  return rows
}

exports.findByShift = async (shiftId) => {
  const [rows] = await db.query(`
    SELECT cr.*, u.username AS kasir_username
    FROM cash_reconciliation cr
    JOIN kasir k ON k.id = cr.kasir_id
    JOIN users u ON u.id = k.user_id
    WHERE cr.shift_id = ?
  `, [shiftId])
  return rows[0] || null
}

exports.findByKasir = async (kasirId) => {
  const [rows] = await db.query(`
    SELECT cr.*, u.username AS kasir_username
    FROM cash_reconciliation cr
    JOIN kasir k ON k.id = cr.kasir_id
    JOIN users u ON u.id = k.user_id
    WHERE cr.kasir_id = ?
    ORDER BY cr.created_at DESC
  `, [kasirId])
  return rows
}

exports.create = async (data) => {
  const { shift_id, kasir_id, expected_cash, actual_cash, discrepancy, note } = data
  const id = uuidv4()
  await db.query(
    `INSERT INTO cash_reconciliation (id, shift_id, kasir_id, expected_cash, actual_cash, discrepancy, note)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, shift_id, kasir_id, expected_cash, actual_cash, discrepancy, note]
  )
  return exports.findByShift(shift_id)
}
