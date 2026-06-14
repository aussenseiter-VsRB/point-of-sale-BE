const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT s.id, s.kasir_id, s.opened_by, s.opened_at, s.closed_at, s.status,
           u.username AS opened_by_username,
           kas.username AS kasir_username
    FROM shifts s
    JOIN users u ON u.id = s.opened_by
    JOIN kasir k ON k.id = s.kasir_id
    JOIN users kas ON kas.id = k.user_id
    WHERE s.deleted_at IS NULL
    ORDER BY s.opened_at DESC
  `)
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(`
    SELECT s.*,
           u.username AS opened_by_username,
           kas.username AS kasir_username
    FROM shifts s
    JOIN users u ON u.id = s.opened_by
    JOIN kasir k ON k.id = s.kasir_id
    JOIN users kas ON kas.id = k.user_id
    WHERE s.id = ? AND s.deleted_at IS NULL
  `, [id])
  return rows[0] || null
}

exports.findByKasir = async (kasirId) => {
  const [rows] = await db.query(`
    SELECT s.id, s.kasir_id, s.opened_by, s.opened_at, s.closed_at, s.status,
           u.username AS opened_by_username,
           kas.username AS kasir_username
    FROM shifts s
    JOIN users u ON u.id = s.opened_by
    JOIN kasir k ON k.id = s.kasir_id
    JOIN users kas ON kas.id = k.user_id
    WHERE s.kasir_id = ? AND s.deleted_at IS NULL
    ORDER BY s.opened_at DESC
  `, [kasirId])
  return rows
}

exports.findOpenByKasir = async (kasirId) => {
  const [rows] = await db.query(
    `SELECT * FROM shifts WHERE kasir_id = ? AND status = 'open' AND deleted_at IS NULL LIMIT 1`,
    [kasirId]
  )
  return rows[0] || null
}

exports.create = async (kasir_id, opened_by) => {
  const id = uuidv4()
  await db.query(
    `INSERT INTO shifts (id, kasir_id, opened_by) VALUES (?, ?, ?)`,
    [id, kasir_id, opened_by]
  )
  return exports.findById(id)
}

exports.close = async (id) => {
  await db.query(
    `UPDATE shifts SET closed_at = NOW(), status = 'closed' WHERE id = ? AND deleted_at IS NULL`,
    [id]
  )
  return exports.findById(id)
}
