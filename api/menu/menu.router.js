const express = require('express')
const app = express()

const Menu = require('./menu.controller')

app.use('/', Menu)

module.exports = app