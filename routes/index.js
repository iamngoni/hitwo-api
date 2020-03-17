const router = require('express').Router();

router.use('/signup', require('./mobile/signup'));
router.use('/signin', require('./mobile/signin'));
router.use('/otp', require('./mobile/mobile-login'));
router.use('/upload', require('./upload'));
router.use('/products', require('./mobile/fetch'));
router.use('/store/signup', require('./web/signup'));
router.use('/store/signin', require('./web/signin'));
router.use('/mobile/change-pin', require('./mobile/change_password'));
module.exports = router;