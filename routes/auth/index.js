const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: async (req, res, next) => {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const token = bearer[1]
      if (!token) {
        return res.status(403).json({message: "no token found"})
      }
      try {
        const decoded = await jwt.verify(token, 'hitwo-api')
        req.user = decoded
        return next()
      } catch (error) {
        return res.status(500).json({})
      }
    } else {
      return res.status(403).json({message: "bearer is undefined"})
    }
  }
}
