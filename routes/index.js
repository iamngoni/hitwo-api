const router = require('express').Router();

router.use('/signup', require('./auth/signup'));
router.use('/signin', require('./auth/signin'));
router.use('/otp', require('./auth/mobile-login'));
router.use('/upload', require('./upload'));
router.use('/products', require('./get_products'));
router.use('/store/signup', require('./web/signup'));
router.use('/store/signin', require('./web/signin'));


module.exports = router;