const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const existing = await knex('produk').select('barcode').limit(1)
  if (existing.length > 0) return

  await knex('produk').insert([
    {
      id: uuidv4(),
      barcode: '8991234567890',
      nama_produk: 'Indomie Goreng',
      harga: 3500.00,
      stok: 100
    },
    {
      id: uuidv4(),
      barcode: '8991234567891',
      nama_produk: 'Indomie Soto',
      harga: 3500.00,
      stok: 80
    },
    {
      id: uuidv4(),
      barcode: '8991234567892',
      nama_produk: 'Aqua 600ml',
      harga: 5000.00,
      stok: 200
    },
    {
      id: uuidv4(),
      barcode: '8991234567893',
      nama_produk: 'Teh Botol Sosro',
      harga: 7500.00,
      stok: 50
    },
    {
      id: uuidv4(),
      barcode: '8991234567894',
      nama_produk: 'Kopiko Cappuccino',
      harga: 12000.00,
      stok: 30
    },
    {
      id: uuidv4(),
      barcode: '8991234567895',
      nama_produk: 'Biskuit Roma Kelapa',
      harga: 8000.00,
      stok: 60
    },
    {
      id: uuidv4(),
      barcode: '8991234567896',
      nama_produk: 'Silverqueen 65g',
      harga: 25000.00,
      stok: 25
    },
    {
      id: uuidv4(),
      barcode: '8991234567897',
      nama_produk: 'Chitato Regular',
      harga: 15000.00,
      stok: 40
    },
    {
      id: uuidv4(),
      barcode: '8991234567898',
      nama_produk: 'Lays Barbeque',
      harga: 12500.00,
      stok: 45
    },
    {
      id: uuidv4(),
      barcode: '8991234567899',
      nama_produk: 'Pocari Sweat 500ml',
      harga: 8500.00,
      stok: 70
    }
  ])
}
