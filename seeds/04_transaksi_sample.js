const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const existingTransaksi = await knex('transaksi').limit(1)
  if (existingTransaksi.length > 0) return

  const kasirList = await knex('kasir').select('id')
  const produkList = await knex('produk').select('id', 'harga', 'nama_produk')

  if (kasirList.length === 0 || produkList.length === 0) return

  const kasir1Id = kasirList[0].id
  const produkMap = {}
  produkList.forEach(p => { produkMap[p.nama_produk] = p })

  const transaksi1Id = uuidv4()
  const transaksi2Id = uuidv4()

  await knex('transaksi').insert([
    {
      id: transaksi1Id,
      id_kasir: kasir1Id,
      total_harga: 15500.00,
      discount_amount: 0,
      discount_reason: null,
      discount_approved_by: null,
      shift_id: null
    },
    {
      id: transaksi2Id,
      id_kasir: kasir1Id,
      total_harga: 52500.00,
      discount_amount: 0,
      discount_reason: null,
      discount_approved_by: null,
      shift_id: null
    }
  ])

  const indomie = produkMap['Indomie Goreng']
  const aqua = produkMap['Aqua 600ml']
  const tehBotol = produkMap['Teh Botol Sosro']
  const silverqueen = produkMap['Silverqueen 65g']
  const chitato = produkMap['Chitato Regular']

  await knex('item_transaksi').insert([
    {
      id: uuidv4(),
      id_transaksi: transaksi1Id,
      id_produk: indomie.id,
      jumlah: 2,
      harga: indomie.harga
    },
    {
      id: uuidv4(),
      id_transaksi: transaksi1Id,
      id_produk: aqua.id,
      jumlah: 1,
      harga: aqua.harga
    },
    {
      id: uuidv4(),
      id_transaksi: transaksi2Id,
      id_produk: silverqueen.id,
      jumlah: 1,
      harga: silverqueen.harga
    },
    {
      id: uuidv4(),
      id_transaksi: transaksi2Id,
      id_produk: chitato.id,
      jumlah: 1,
      harga: chitato.harga
    },
    {
      id: uuidv4(),
      id_transaksi: transaksi2Id,
      id_produk: tehBotol.id,
      jumlah: 1,
      harga: tehBotol.harga
    }
  ])
}
