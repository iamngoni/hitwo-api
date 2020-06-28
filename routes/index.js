const router = require('express').Router()
const cp = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const Stores = require('./../models/store')

router.use(cp())
router.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false, secret: 'hitwo-api' }))
router.use(flash())

// api routes
router.use('/mobile', require('./mobile'))
router.use('/store', require('./web'))
router.use('/public', require('./public'))

// web view routes routes
router.get('/portal', (req, res) => {
  if (req.cookies.store_id == null) {
    res.render('portal_login', {
      title: 'Easy Locate | Portal Login',
      notifications: req.flash('notifications'),
      errors: req.flash('errors'),
      success: req.flash('success')
    })
  } else {
    req.flash('notifications', 'To register a new business you have to logout of this session first.')
    res.redirect('/dashboard')
  }
})

router.get('/register', (req, res) => {
  if (req.cookies.store_id == null) {
    res.render('portal_register', {
      title: 'Easy Locate | Portal Register',
      notifications: req.flash('notifications'),
      errors: req.flash('errors'),
      success: req.flash('success')
    })
  } else {
    req.flash('notifications', 'To register a new business you have to logout of this session first.')
    res.redirect('/dashboard')
  }
})

router.get('/dashboard', (req, res) => {
  if (req.cookies.store_id == null) {
    console.log('user is not logged in')
    req.flash('errors', 'You have to login first.')
    res.redirect('/portal')
  } else {
    Stores.findById(req.cookies.store_id).then((store) => {
      if (!store) {
        req.flash('errors', 'Session should have expired')
        res.clearCookie('store_id')
        res.redirect('/portal')
      }
      res.render('protected/dashboard', {
        title: 'Easy Locate | Dashboard',
        notifications: req.flash('notifications'),
        errors: req.flash('errors'),
        success: req.flash('success'),
        name: store.name
      })
    }).catch((e) => {
      console.log(e)
      res.clearCookie('store_id')
      req.flash('errors', 'Server encountered an error. Try logging in again')
      res.redirect('/portal')
    })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('store_id')
  req.flash('success', "You've been logged out of your session successfully")
  res.redirect('/portal')
})

module.exports = router
