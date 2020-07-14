const router = require('express').Router()

router.use('/mobile', require('./mobile'))
router.use('/public', require('./public'))

module.exports = router
