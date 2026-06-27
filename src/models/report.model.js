const db = require('../config/db')

exports.getDailyItemReport = async (id_kasir, date) => {
  let query = `
    SELECT
      p.nama_produk,
      p.barcode,
      SUM(it.jumlah) AS total_qty,
      SUM(it.jumlah * it.harga) AS total_harga
    FROM transaksi t
    JOIN item_transaksi it ON it.id_transaksi = t.id
    JOIN produk p ON p.id = it.id_produk
    WHERE DATE(t.created_at) = ?
    AND t.deleted_at IS NULL
  `
  const params = [date]
  if (id_kasir) {
    query += ` AND t.id_kasir = ?`
    params.push(id_kasir)
  }
  query += `
    GROUP BY p.id, p.nama_produk, p.barcode
    ORDER BY total_qty DESC
  `
  const [rows] = await db.query(query, params)
  return rows
}

exports.getDailyProfit = async (id_kasir, date) => {
  let query = `
    SELECT
      COUNT(t.id) AS total_transaksi,
      SUM(t.total_harga) AS total_penjualan
    FROM transaksi t
    WHERE DATE(t.created_at) = ?
    AND t.deleted_at IS NULL
  `
  const params = [date]
  if (id_kasir) {
    query += ` AND t.id_kasir = ?`
    params.push(id_kasir)
  }
  const [rows] = await db.query(query, params)
  return rows[0] || null
}

exports.getWeeklyReport = async (id_kasir) => {
  let query = `
    SELECT
      DATE(t.created_at) AS tanggal,
      COUNT(t.id) AS jumlah_transaksi,
      SUM(t.total_harga) AS total_harga
    FROM transaksi t
    WHERE t.deleted_at IS NULL
    AND YEARWEEK(t.created_at) = YEARWEEK(CURDATE())
  `
  const params = []
  if (id_kasir) {
    query += ` AND t.id_kasir = ?`
    params.push(id_kasir)
  }
  query += `
    GROUP BY DATE(t.created_at)
    ORDER BY tanggal DESC
  `
  const [rows] = await db.query(query, params)
  return rows
}

exports.getMonthlyReport = async (id_kasir) => {
  let query = `
    SELECT
      DATE(t.created_at) AS tanggal,
      COUNT(t.id) AS jumlah_transaksi,
      SUM(t.total_harga) AS total_harga
    FROM transaksi t
    WHERE t.deleted_at IS NULL
    AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  `
  const params = []
  if (id_kasir) {
    query += ` AND t.id_kasir = ?`
    params.push(id_kasir)
  }
  query += `
    GROUP BY DATE(t.created_at)
    ORDER BY tanggal DESC
  `
  const [rows] = await db.query(query, params)
  return rows
}
