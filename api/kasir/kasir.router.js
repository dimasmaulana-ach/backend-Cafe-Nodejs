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
const Auth = require('../../middleware')

router.get('/', Auth, controllerGetKasir)
router.get('/:id', Auth, controllerGetKasirById)
router.post('/', Auth, controllerAddKasir)
router.put('/:id', Auth, controllerUpdateKasir)
router.delete('/:id', Auth, controllerDeleteKasir)
router.post('/login', controllerLoginKasir)
router.post('/:id', controllerChangePassword)
router.patch('/:id', controllerUpdateNameUsername)

module.exports = router