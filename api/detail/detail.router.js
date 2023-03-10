const express = require('express')
const router = express.Router()

const {
    controllerGetDetails,
    controllerGetDetailsById,
    controllerAddDetails,
    controllerEditDetails,
    controllerDeleteDetails
} = require('./detail.controller')

router.get('/', controllerGetDetails)
router.get('/:id', controllerGetDetailsById)
router.post('/', controllerAddDetails)
router.put('/:id', controllerEditDetails)
router.delete('/:id', controllerDeleteDetails)

module.exports = router