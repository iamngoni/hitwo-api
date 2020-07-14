const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  Bname: String,
  Bcategory: String,
  Bemail: String,
  Bphone: String,
  Btype: String,
  Blogo: String,

  Fname: String,
  Lname: String,
  Username: String,
  Email: {
    type: String
  },
  Password: {
    type: String
  },
  Aline1: String,
  Aline2: String,
  City: String,
  State: String,
  Country: String,
  Zipcode: String,
  registered: String,
  Bdescription: String,
  Adescription: String,
  Email1: String,
  Email2: String,
  Facebook: String,
  Twitter: String,
  Whatsapp: String,
  Phone: String,
  Other: String,

  Latitude: String,
  Longitude: String,
  paymentmade: false,
  isChecked: {
    type: String,
    default: false
  },
  isLayout: {
    type: String,
    default: false
  },
  isGraph: {
    type: String,
    default: false
  }

})

// encrypting before saving
UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('Password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.Password, salt, null, function (err, hash) {
        if (err) {
          return next(err)
        }

        user.Password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (Password, next) {
  // no arrow function coz we want to access the user using this;
  const user = this
  return bcrypt.compareSync(Password, user.Password)
}

module.exports = mongoose.model('User', UserSchema)
