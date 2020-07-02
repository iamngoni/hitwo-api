const router = require('express').Router()
const controller = require('./controller')
const auth = require('./../auth')

router.use('/signup', controller.signup)
router.use('/signin', controller.signin)
router.use('/utils/get_token/:number', controller.sendToken)
router.use('/utils/verify/:id/:token', controller.verifyToken)
router.use('/change_password', auth.verifyToken, controller.changePassword)
router.use('/products', auth.verifyToken, controller.getProducts)
router.use('/rate', auth.verifyToken, controller.rateProduct)
router.use('/comment/:id', auth.verifyToken, controller.postAComment)

module.exports = router
