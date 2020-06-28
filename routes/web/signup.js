const router = require('express').Router()
const Store = require('./../../models/store')
const cp = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router.use(cp())
router.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false, secret: 'hitwo-api' }))
router.use(flash())

router.post('/', (req, res) => {
  var { name, address, latitude, longitude, email, phone, password } = req.body
  var shop = new Store()
  shop.name = name
  shop.address = address
  shop.latitude = latitude
  shop.longitude = longitude
  shop.email = email
  shop.phone = phone

  shop.setPassword(password)
  shop.setVerification()

  shop.save().then((response) => {
    if (!response) {
      req.flash('errors', "Sorry. Couldn't create store. Try again.")
      res.redirect('/register')
    }
    req.flash('success', 'Store successfully created.')
    res.redirect('/portal')
  }).catch((err) => {
    console.log(err)
    req.flash('errors', 'Server unfortunately encountered an error. Try again.')
    res.redirect('/register')
  })
})

module.exports = router
