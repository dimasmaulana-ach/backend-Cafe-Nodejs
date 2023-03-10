const express = require('express')
const router = express.Router()
const {
    controllerGetTransaksi,
    controllerGetTransaksiById,
    controllerAddTransaksi,
    controllerDeteleTransaksi
} = require('./transaksi.controller')


router.get('/', controllerGetTransaksi)
router.get('/:id', controllerGetTransaksiById)
router.post('/', controllerAddTransaksi)
router.delete('/:id', controllerDeteleTransaksi)

module.exports = router