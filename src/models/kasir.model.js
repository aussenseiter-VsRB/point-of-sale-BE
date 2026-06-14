// models/kasirModel.js
const db = require('../config/db')

exports.findAll = async () => {
  const [rows] = await db.query(
    `SELECT kasir.id, kasir.modal, kasir.created_at,
            users.username, users.role
     FROM kasir
     JOIN users ON kasir.user_id = users.id
     WHERE kasir.deleted_at IS NULL`
  )
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT kasir.id, kasir.modal, kasir.created_at,
            users.username, users.role
     FROM kasir
     JOIN users ON kasir.user_id = users.id
     WHERE kasir.id = ? AND kasir.deleted_at IS NULL`,
    [id]
  )
  return rows[0] || null
}

exports.findByUserId = async (user_id) => {
  const [rows] = await db.query(
    `SELECT * FROM kasir WHERE user_id = ? AND deleted_at IS NULL`,
    [user_id]
  )
  return rows[0] || null
}

exports.create = async (data) => {
  const { user_id, modal } = data
  const [result] = await db.query(
    `INSERT INTO kasir (user_id, modal) VALUES (?, ?)`,
    [user_id, modal]
  )
  return exports.findById(result.insertId)
}

exports.updateModal = async (id, modal) => {
  await db.query(
    `UPDATE kasir SET modal = ? WHERE id = ? AND deleted_at IS NULL`,
    [modal, id]
  )
  return exports.findById(id)
}

exports.softDelete = async (id) => {
  await db.query(
    `UPDATE kasir SET deleted_at = NOW() WHERE id = ?`,
    [id]
  )
}