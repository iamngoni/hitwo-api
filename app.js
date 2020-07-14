require('dotenv').config()
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const path = require('path')

var app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(require('./routes'))

module.exports = app
