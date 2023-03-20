const express = require('express')
const router = express.Router()
const {
    controllerGetKasir,
    controllerGetKasirById,
    controllerAddKasir,
    controllerUpdateKasir,
    controllerDeleteKasir,
    controllerLoginKasir,
    controllerChangePassword,
    controllerUpdateNameUsername
} = require('./kasir.controller')

router.get('/', controllerGetKasir)
router.get('/:id', controllerGetKasirById)
router.post('/', controllerAddKasir)
router.put('/:id', controllerUpdateKasir)
router.delete('/:id', controllerDeleteKasir)
router.post('/login', controllerLoginKasir)
router.post('/:id', controllerChangePassword)
router.patch('/:id', controllerUpdateNameUsername)

module.exports = router