// middlewares/generateBarcode.js
const produkModel = require('../models/produk.models')

const generateBarcode = async (req, res, next) => {
  try {
    // generate a 13 digit EAN-13 style barcode
    const generateCode = () => {
      const prefix = '899' // indonesion product prefix
      const random = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0')
      return prefix + random
    }

    // make sure the barcode is unique
    let barcode
    let exists = true

    while (exists) {
      barcode = generateCode()
      const produk = await produkModel.findByBarcode(barcode)
      exists = !!produk // keep generating until we get a unique one
    }

    req.body.barcode = barcode // attach to request body
    next()
  } catch (error) {
    res.status(500).json({ message: `Failed to generate barcode: ${error.message}` })
  }
}

module.exports = generateBarcode