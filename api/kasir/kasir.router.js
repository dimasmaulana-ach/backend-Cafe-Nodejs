const express = require('express')
const router = express.Router()
const {
    controllerGetKasir,
    controllerGetKasirById,
    controllerAddKasir,
    controllerUpdateKasir,
    controllerDeleteKasir,
    controllerLoginKasir
} = require('./kasir.controller')

router.get('/', controllerGetKasir)
router.get('/:id', controllerGetKasirById)
router.post('/', controllerAddKasir)
router.put('/:id', controllerUpdateKasir)
router.delete('/:id', controllerDeleteKasir)
router.post('/', controllerLoginKasir)

module.exports = router