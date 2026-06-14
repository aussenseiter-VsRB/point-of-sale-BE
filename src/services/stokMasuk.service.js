const AppError = require('../errors/AppError')
const stokMasukModel = require('../models/stokMasuk.model')
const produkModel = require('../models/produk.models')

exports.getAll = async () => {
  return await stokMasukModel.findAll()
}

exports.getByProduk = async (id_produk) => {
  const produk = await produkModel.findById(id_produk)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)
  return await stokMasukModel.findByProduk(id_produk)
}

exports.create = async (data, id_user) => {
  const { id_produk, jumlah_beli, jumlah_satuan, harga_beli, supplier, keterangan } = data

  if (!id_produk || jumlah_beli === undefined) {
    throw new AppError('INVALID_PAYLOAD: id_produk and jumlah_beli are required', 400)
  }

  const produk = await produkModel.findById(id_produk)
  if (!produk) throw new AppError('PRODUK_NOT_FOUND', 404)

  const unitsPerBox = jumlah_satuan || 1
  const totalTambahStok = Number(jumlah_beli) * Number(unitsPerBox)

  if (totalTambahStok <= 0) {
    throw new AppError('INVALID_PAYLOAD: total stock must be > 0', 400)
  }

  const stokMasuk = await stokMasukModel.create({
    id_produk,
    id_user,
    jumlah_beli,
    jumlah_satuan: unitsPerBox,
    harga_beli: harga_beli ? Number(harga_beli) : null,
    supplier: supplier || null,
    keterangan: keterangan || null
  })

  await produkModel.updateStok(id_produk, produk.stok + totalTambahStok)

  return await stokMasukModel.findById(stokMasuk.id)
}
