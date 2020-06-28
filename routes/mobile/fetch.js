const router = require('express').Router()
const Products = require('./../../models/products')
const authenticaor = require('./../auth')

router.get('/', authenticaor.verifyToken, (req, res) => {
  Products.find().then((data) => {
    res.status(200).send(data)
  })
})

module.exports = router
