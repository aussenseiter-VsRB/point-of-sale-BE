// models/produkModel.js
const db = require('../config/db')

exports.findAll = async () => {
  const [rows] = await db.query(
    `SELECT * FROM produk WHERE deleted_at IS NULL
     ORDER BY nama_produk ASC`
  )
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM produk WHERE id = ? AND deleted_at IS NULL`,
    [id]
  )
  return rows[0] || null
}

exports.findByBarcode = async (barcode) => {
  const [rows] = await db.query(
    `SELECT * FROM produk WHERE barcode = ? AND deleted_at IS NULL`,
    [barcode]
  )
  return rows[0] || null
}

exports.create = async (data) => {
  const { barcode, nama_produk, harga, stok, discount_percent } = data
  await db.query(
    `INSERT INTO produk (id, barcode, nama_produk, harga, stok, discount_percent) 
     VALUES (UUID(), ?, ?, ?, ?, ?)`,
    [barcode, nama_produk, harga, stok, discount_percent || 0]
  )
  return exports.findByBarcode(barcode)
}

exports.update = async (id, data) => {
  const fields = []
  const values = []
  if (data.barcode !== undefined) { fields.push('barcode = ?'); values.push(data.barcode) }
  if (data.nama_produk !== undefined) { fields.push('nama_produk = ?'); values.push(data.nama_produk) }
  if (data.harga !== undefined) { fields.push('harga = ?'); values.push(data.harga) }
  if (data.discount_percent !== undefined) { fields.push('discount_percent = ?'); values.push(data.discount_percent) }
  if (fields.length === 0) return exports.findById(id)
  values.push(id)
  await db.query(
    `UPDATE produk SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`,
    values
  )
  return exports.findById(id)
}

exports.updateStok = async (id, stok) => {
  await db.query(
    `UPDATE produk SET stok = ? WHERE id = ? AND deleted_at IS NULL`,
    [stok, id]
  )
  return exports.findById(id)
}

exports.softDelete = async (id) => {
  await db.query(
    `UPDATE produk SET deleted_at = NOW() WHERE id = ?`,
    [id]
  )
}