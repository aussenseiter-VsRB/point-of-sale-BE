// models/reportModel.js

const db = require('../config/db')

exports.getDailyItemReport = async (id_kasir, date) => {
  const [rows] = await db.query(
    `SELECT 
      p.nama_produk,
      p.barcode,
      SUM(it.jumlah) AS total_terjual,
      SUM(it.jumlah * it.harga) AS total_pendapatan
     FROM transaksi t
     JOIN item_transaksi it ON it.id_transaksi = t.id
     JOIN produk p ON p.id = it.id_produk
     WHERE t.id_kasir = ?
     AND DATE(t.created_at) = ?
     AND t.deleted_at IS NULL
     GROUP BY p.id, p.nama_produk, p.barcode
     ORDER BY total_terjual DESC`,
    [id_kasir, date]
  )
  return rows || null
}

// Total profit per day for a cashier
exports.getDailyProfit = async (id_kasir, date) => {
  const [rows] = await db.query(
    `SELECT 
      DATE(t.created_at) AS tanggal,
      COUNT(t.id) AS total_transaksi,
      SUM(t.total_harga) AS total_profit
     FROM transaksi t
     WHERE t.id_kasir = ?
     AND DATE(t.created_at) = ?
     AND t.deleted_at IS NULL`,
    [id_kasir, date]
  )
  return rows[0] || null
}

// Profit breakdown across multiple days (last 30 days)
exports.getMonthlyReport = async (id_kasir) => {
  const [rows] = await db.query(
    `SELECT 
      DATE(t.created_at) AS tanggal,
      COUNT(t.id) AS total_transaksi,
      SUM(t.total_harga) AS total_profit
     FROM transaksi t
     WHERE t.id_kasir = ?
     AND t.deleted_at IS NULL
     AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
     GROUP BY DATE(t.created_at)
     ORDER BY tanggal DESC`,
    [id_kasir]
  )
  return rows || null
}