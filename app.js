require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require("morgan");

var app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(logger('dev'));

app.use(require('./routes'));

module.exports = app;