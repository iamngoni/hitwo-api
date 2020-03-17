const router = require('express').Router();

router.use('/mobile', require('./mobile'));
router.use('/store', require('./web'));

module.exports = router;