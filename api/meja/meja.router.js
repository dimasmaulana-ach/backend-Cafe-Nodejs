const express = require('express')
const router = express.Router()
const {
    controllerGetMeja,
    controllerGetMejaById,
    controllerAddMeja,
    controllerUpdateMeja,
    controllerDeleteMeja
} = require('./meja.controller')

router.get('/', controllerGetMeja)
router.get('/:id', controllerGetMejaById)
router.post('/', controllerAddMeja)
router.put('/:id', controllerUpdateMeja)
router.delete('/:id', controllerDeleteMeja)

module.exports = router