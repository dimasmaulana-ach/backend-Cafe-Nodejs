const express = require('express')
const router = express.Router()

const { controllerLogOut, controllerGetLog } = require('./log.controller')

router.get('/', controllerGetLog)
router.post('/', controllerLogOut)

module.exports = router