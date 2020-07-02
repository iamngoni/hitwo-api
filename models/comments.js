const mongoose = require('mongoose')

const comment = mongoose.Schema({
  user: {
    id: String,
    name: String
  },
  productId: String,
  comment: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comments', comment)
