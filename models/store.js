const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')

var storeSchema = mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  latitude: String,
  longitude: String,
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  hash: String,
  salt: String
})

storeSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

storeSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

storeSchema.methods.setVerification = function () {
  var theString = uuidv4()
  this.verificationToken = theString
}

module.exports = mongoose.model('Stores', storeSchema)
