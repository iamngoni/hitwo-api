const router = require('express').Router()
const Products = require('./../../models/products')
const authenticaor = require('./../auth')

router.post('/', authenticaor.verifyToken, (req, res) => {
  console.log('configuring rating.')
  var user_id = req.user.id
  var { id, rating, } = req.body
  Products.findById(id).then((product) => {
    if (!product) {
      return res.status(404).json({
        message: 'product no longer exists',
        status: false
      })
    }
    var data = []
    product.persons.forEach((person) => {
      data.push(person)
    })

    if (!data.includes(user_id)) {
      data.push(user_id)
      Products.updateOne({ _id: product._id }, {
        $set: {
          persons: data
        },
        $inc: {
          rates_no: 1,
          user_rating: rating
        }
      }, (err, doc) => {
        if (!err) {
          Products.findById(product._id).then((prod) => {
            var nRating = (prod.user_rating / (prod.rates_no * 5)) * 5
            Products.updateOne({ _id: prod._id }, {
              $set: {
                rating: nRating
              }
            }, (err, doc) => {
              if (!err) {
                return res.status(200).json({
                  message: 'rating accepted',
                  status: true
                })
              } else {
                return res.status(500).json({
                  message: 'rating server error.',
                  status: false
                })
              }
            })
          })
        } else {
          return res.status(500).json({
            message: 'rating server error.',
            status: false
          })
        }
      })
    } else {
      console.log('user already rated product')
      return res.status(401).json({
        message: 'Exceeded max rating chance on this product',
        status: false
      })
    }
  }).catch(e => {
    console.log(e)
    return null
  })
})

module.exports = router
