const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT vl.*, t.total_harga, t.created_at AS transaksi_created_at,
           u.username AS voided_by_username
    FROM void_log vl
    JOIN transaksi t ON t.id = vl.transaksi_id
    JOIN users u ON u.id = vl.voided_by
    ORDER BY vl.voided_at DESC
  `)
  return rows
}

exports.findByTransaksi = async (transaksiId) => {
  const [rows] = await db.query(`
    SELECT vl.*, t.total_harga, t.created_at AS transaksi_created_at,
           u.username AS voided_by_username
    FROM void_log vl
    JOIN transaksi t ON t.id = vl.transaksi_id
    JOIN users u ON u.id = vl.voided_by
    WHERE vl.transaksi_id = ?
  `, [transaksiId])
  return rows[0] || null
}

exports.create = async (data) => {
  const { transaksi_id, voided_by, reason } = data
  const id = uuidv4()
  await db.query(
    `INSERT INTO void_log (id, transaksi_id, voided_by, reason) VALUES (?, ?, ?, ?)`,
    [id, transaksi_id, voided_by, reason]
  )
  return exports.findByTransaksi(transaksi_id)
}
