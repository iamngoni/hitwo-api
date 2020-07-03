const Users = require('./../../models/users')
const jwt = require('jsonwebtoken')
const Nexmo = require('nexmo')
const crypto = require('crypto')
const Products = require('./../../models/products')
const Comments = require('./../../models/comments')
const { appendFileSync } = require('fs')

const nexmo = new Nexmo({
  apiKey: '397d74eb',
  apiSecret: 'Q3WfYlXJhTifEdf3'
})

module.exports = {
  signup: (req, res) => {
    var { username, email, password, mobileNumber } = req.body
    const user = new Users()
    user.username = username
    user.email = email
    user.mobileNumber = mobileNumber
    user.setPassword(password)
    user.setVerification(mobileNumber)

    user.save().then(currentUser => {
      return res.status(200).json({
        id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        mobileNumber: currentUser.mobileNumber,
        isVerified: currentUser.isVerified,
        likes: currentUser.likes
      })
    }).catch(e => {
      console.log(e)
      return res.status(500).json({
        message: 'Server error'
      })
    })
  },
  signin: (req, res) => {
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
  },
  sendToken: (req, res) => {
    const number = req.params.number

    const from = 'iamngoniapps'
    const to = `${number}`
    var text = ''

    Users.findOne({ mobileNumber: number }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'Mobile number not found'
        })
      }
      text = `Product Locator Verification Code: ${user.verificationToken} \n\n`
      nexmo.message.sendSms(from, to, text, (err, response) => {
        if (err) {
          return console.log(`messaging error! ${err}`)
        } else {
          if (response.messages[0].status === '0') {
            console.log('Message sent successfully.')
            return res.status(200).json({
              status: true,
              id: user._id
            })
          } else {
            console.log(`Message failed with error: ${response.messages[0]['error-text']}`)
            return res.status(500).json({
              status: false
            })
          }
        }
      })
    }).catch(e => console.log(e))
  },
  verifyToken: (req, res) => {
    Users.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'Could not find user. Try registering'
        })
      }
      console.log(user)
      if (user.verificationToken === req.params.token) {
        Users.updateOne(
          { _id: req.params.id },
          {
            $set: {
              isVerified: true
            }
          },
          (err, doc) => {
            if (!err) {
              console.log('Hurray')
              return res.status(200).json({
                isVerified: true
              })
            } else {
              console.log('Errors happen all the time')
              return res.status(500).json({message: 'server error'})
            }
          }
        )
      } else {
        return res.status(401).json({message: 'token is wrong'})
        console.log('token string is wrong')
      }
    }).catch(e => console.log(e))
  },
  changePassword: (req, res) => {
    var currentUsr = req.user
    var { currentPassword, newPassword } = req.body
    Users.findById(currentUsr.id).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'user with id not found'
        })
      }

      if (user.validatePassword(currentPassword)) {
        Users.updateOne({ _id: user._id }, {
          $set: {
            hash: crypto.pbkdf2Sync(newPassword, user.setMaxListeners, 10000, 512, 'sha512').toString('hex')
          }
        }, (err, doc) => {
          if (!err) {
            return res.status(200).json({
              message: 'password changed'
            })
          } else {
            return res.status(500).json({
              message: 'server error'
            })
          }
        })
      } else {
        return res.status(403).json({
          message: 'current password is wrong'
        })
      }
    })
  },
  getProducts: (req, res) => {
    var usr = req.user
    if (usr != null) {
      Products.find().then((data) => {
        res.status(200).send(data)
      })
    }
  },
  rateProduct: async (req, res) => {
    var usr = req.user
    var { id, rating } = req.body
    var product = await Products.findById(id)
    if (!product) {
      return res.status(404).json({
        message: 'product no longer exists',
        status: false
      })
    }
    var data = []
    product.persons.forEach((person) => {
      data.push(person)
    })

    if (!data.includes(usr.id)) {
      data.push(usr.id)
      Products.updateOne({ _id: product._id }, {
        $set: {
          persons: data
        },
        $inc: {
          rates_no: 1,
          user_rating: rating
        }
      }, async (err, doc) => {
        if (!err) {
          var prod = await Products.findById(product._id)
          var nrating = (prod.user_rating / (prod.rates_no * 5)) * 5
          Products.updateOne({ _id: prod._id }, {
            $set: {
              rating: nRating
            }
          }, (err, doc) => {
            if (!err) {
              return res.status(200).json({
                message: 'rating accepted',
                status: true
              })
            } else {
              return res.status(500).json({
                message: 'rating server error.',
                status: false
              })
            }
          })
        } else {
          return res.status(500).json({
            message: 'rating server error.',
            status: false
          }
          )
        }
      })
    } else {
      console.log('user already rated product')
      return res.status(401).json({
        message: 'Exceeded max rating chance on this product',
        status: false
      })
    }
  },
  postAComment: async (req, res) => {
    var usr = req.user
    var { comment } = req.body
    var productId = req.params.id
    var comment = new Comments()
    comment.user.id = usr.id
    comment.user.name = usr.username
    comment.productId = productId
    comment.comment = comment
    var isSaved = await comment.save()
    if (!isSaved) {
      return res.status(500).json({
        message: 'Server error'
      })
    }
    return res.status(200).json({
      message: 'comment send'
    })
  }
}
