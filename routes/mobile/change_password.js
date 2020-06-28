const Users = require('./../../models/users')
const router = require('express').Router()
const crypto = require('crypto')
const authenticaor = require('./../auth')

router.post('/', authenticaor.verifyToken, (req, res) => {
  var reqUser = req.user
  var { currentPassword, newPassword } = req.body
  Users.findById(reqUser.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: 'user with id not found'
      })
    }

    if (user.validatePassword(currentPassword)) {
      Users.updateOne(
        { _id: id },
        {
          $set: {
            hash: crypto.pbkdf2Sync(newPassword, user.salt, 10000, 512, 'sha512').toString('hex')
          }
        },
        (err, doc) => {
          if (!err) {
            return res.status(200).json({
              message: 'password changed'
            })
          } else {
            return res.status(500).json({
              message: 'server error'
            })
          }
        }
      )
    } else {
      return res.status(403).json({
        message: 'current password is wrong'
      })
    }
  })
})

module.exports = router
