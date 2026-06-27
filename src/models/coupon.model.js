const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(
    `SELECT * FROM coupons WHERE deleted_at IS NULL ORDER BY created_at DESC`
  )
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM coupons WHERE id = ? AND deleted_at IS NULL`,
    [id]
  )
  return rows[0] || null
}

exports.findByCode = async (code) => {
  const [rows] = await db.query(
    `SELECT * FROM coupons WHERE code = ? AND deleted_at IS NULL LIMIT 1`,
    [code]
  )
  return rows[0] || null
}

exports.create = async (data) => {
  const id = uuidv4()
  await db.query(
    `INSERT INTO coupons (id, code, discount_amount, description, is_active)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.code, data.discount_amount, data.description || null, data.is_active !== false]
  )
  return exports.findById(id)
}

exports.update = async (id, data) => {
  await db.query(
    `UPDATE coupons SET code = ?, discount_amount = ?, description = ?, is_active = ? WHERE id = ? AND deleted_at IS NULL`,
    [data.code, data.discount_amount, data.description || null, data.is_active !== false, id]
  )
  return exports.findById(id)
}

exports.softDelete = async (id) => {
  await db.query(
    `UPDATE coupons SET deleted_at = NOW() WHERE id = ?`,
    [id]
  )
}
