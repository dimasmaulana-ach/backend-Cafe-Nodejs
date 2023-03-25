const express = require('express')
const router = express.Router()

const { controllerLogOut } = require('./log.controller')

router.post('/', controllerLogOut)

module.exports = router