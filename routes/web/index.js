const router = require('express').Router()

router.use('/signin', require('./signin'))
router.use('/signup', require('./signup'))
router.use('/upload', require('./upload'))

module.exports = router
