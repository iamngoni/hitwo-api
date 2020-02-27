const router = require('express').Router();

router.use('/signup', require('./mobile/signup'));
router.use('/signin', require('./mobile/signin'));
router.use('/otp', require('./mobile/mobile-login'));
router.use('/upload', require('./upload'));
router.use('/products', require('./utilities/get_products'));
router.use('/store/signup', require('./web/signup'));
router.use('/store/signin', require('./web/signin'));

module.exports = router;