const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const Auth = require('./middleware')


app.use(express())
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

const Role = require('./api/role/role.router')
app.use('/api/role', Auth, Role)

const Kasir = require('./api/kasir/kasir.router')
app.use('/api/kasir', Kasir)

const Category = require('./api/category/category.router')
app.use('/api/category', Auth, Category)

const Meja = require('./api/meja/meja.router')
app.use('/api/meja', Auth, Meja)

const Menu = require('./api/menu/menu.router')
app.use('/api/menu', Auth, Menu)

const Transaksi = require('./api/transaksi/transaksi.router')
app.use('/api/transaksi', Auth, Transaksi)

const Details = require('./api/detail/detail.router')
app.use('/api/details', Auth, Details)

const Report = require('./api/report/report.router')
app.use('/api/report', Auth, Report)

const Logs = require('./api/log/log.router')
app.use('/api/logs', Auth, Logs)

const DataDetails = require('./api/data_details/data_details.router')
app.use('/api/checkout', DataDetails)

app.listen(8080, ()=> console.log('server run at port 8080'))