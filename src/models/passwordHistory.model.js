const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.create = async (userId, changedBy) => {
  const id = uuidv4()
  await db.query(
    'INSERT INTO password_history (id, user_id, changed_by) VALUES (?, ?, ?)',
    [id, userId, changedBy]
  )
  return id
}

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT
      ph.id,
      ph.created_at,
      u.username AS user_username,
      u.role AS user_role,
      cb.username AS changed_by_username,
      cb.role AS changed_by_role
    FROM password_history ph
    JOIN users u ON u.id = ph.user_id
    JOIN users cb ON cb.id = ph.changed_by
    ORDER BY ph.created_at DESC
  `)
  return rows
}
