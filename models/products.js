const mongoose = require('mongoose')

var productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  model: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: null
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  rates_no: {
    type: Number,
    default: 0
  },
  user_rating: {
    type: Number,
    default: 0
  },
  persons: {
    type: Array
  },
  date: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: String,
  gallery: {
    type: Array,
    default: []
  },
  description: String
})

module.exports = mongoose.model('Products', productsSchema)
