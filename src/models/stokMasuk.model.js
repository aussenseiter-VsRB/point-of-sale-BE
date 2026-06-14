const db = require('../config/db')
const { v4: uuidv4 } = require('uuid')

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT sm.*, p.nama_produk, p.barcode, u.username
    FROM stok_masuk sm
    JOIN produk p ON p.id = sm.id_produk
    LEFT JOIN users u ON u.id = sm.id_user
    ORDER BY sm.created_at DESC
  `)
  return rows
}

exports.findByProduk = async (id_produk) => {
  const [rows] = await db.query(`
    SELECT sm.*, p.nama_produk, p.barcode, u.username
    FROM stok_masuk sm
    JOIN produk p ON p.id = sm.id_produk
    LEFT JOIN users u ON u.id = sm.id_user
    WHERE sm.id_produk = ?
    ORDER BY sm.created_at DESC
  `, [id_produk])
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(`
    SELECT sm.*, p.nama_produk, p.barcode, u.username
    FROM stok_masuk sm
    JOIN produk p ON p.id = sm.id_produk
    LEFT JOIN users u ON u.id = sm.id_user
    WHERE sm.id = ?
  `, [id])
  return rows[0] || null
}

exports.create = async (data) => {
  const { id_produk, id_user, jumlah_beli, jumlah_satuan, harga_beli, supplier, keterangan } = data
  const id = uuidv4()

  await db.query(`
    INSERT INTO stok_masuk (id, id_produk, id_user, jumlah_beli, jumlah_satuan, harga_beli, supplier, keterangan)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [id, id_produk, id_user, jumlah_beli, jumlah_satuan, harga_beli, supplier, keterangan])

  return exports.findById(id)
}
