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
  const { barcode, nama_produk, harga, stok } = data
  await db.query(
    `INSERT INTO produk (id, barcode, nama_produk, harga, stok) 
     VALUES (UUID(), ?, ?, ?, ?)`,
    [barcode, nama_produk, harga, stok]
  )
  return exports.findByBarcode(barcode)
}

exports.update = async (id, data) => {
  const { barcode, nama_produk, harga } = data
  await db.query(
    `UPDATE produk SET barcode = ?, nama_produk = ?, harga = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [barcode, nama_produk, harga, id]
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