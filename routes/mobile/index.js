const router = require('express').Router();

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/utils', require('./utils'));
router.use('/change_password', require('./change_password'));

module.exports = router;