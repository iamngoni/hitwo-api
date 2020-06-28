const router = require('express').Router()
const Users = require('./../../models/users')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
  var { username, password } = req.body
  Users.findOne({ username }).then(user => {
    if (!user && !user.validatePassword(password)) {
      return res.status(401).json({
        message: 'Username or password don\'t match. Try again or create an account.'
      })
    }

    var payload = { username: user.username, id: user._id, email: user.email, mobileNumber: user.mobileNumber, isVerified: user.isVerified, likes: user.likes }
    const token = jwt.sign(payload, 'hitwo-api', { expiresIn: '2h' })
    return res.status(200).json({
      token
    })
  }).catch(e => {
    console.log(e)
    return res.status(500).json({
      message: 'Server error. Try again'
    })
  })
})

module.exports = router
