const router = require('express').Router();

router.use('/signup', require('./auth/signup'));
router.use('/signin', require('./auth/signin'));

module.exports = router;