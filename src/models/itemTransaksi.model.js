// models/itemTransaksiModel.js
const db = require('../config/db')

exports.findByTransaksi = async (id_transaksi) => {
  const [rows] = await db.query(
    `SELECT it.id, it.jumlah, 
            p.nama_produk, p.barcode, p.harga,
            (it.jumlah * p.harga) AS subtotal
     FROM item_transaksi it
     JOIN produk p ON p.id = it.id_produk
     WHERE it.id_transaksi = ?`,
    [id_transaksi]
  )
  return rows
}

exports.create = async (id_transaksi, id_produk, jumlah, harga) => {
  await db.query(
    `INSERT INTO item_transaksi (id, id_transaksi, id_produk, jumlah, harga) 
     VALUES (UUID(), ?, ?, ?, ?)`,
    [id_transaksi, id_produk, jumlah, harga]
  )
}

exports.deleteByTransaksi = async (id_transaksi) => {
  await db.query(
    `DELETE FROM item_transaksi WHERE id_transaksi = ?`,
    [id_transaksi]
  )
}