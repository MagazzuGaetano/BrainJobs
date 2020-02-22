const jwt = require('jsonwebtoken')
const config = require('../config')

let verifyToken = (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return res.status(403).json({
      auth: false,
      message: 'No token provided.'
    })
  }

  // Remove Bearer
  token = token.slice(7)

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: 'Failed to authenticate token.'
      })
    }

    req.userId = decoded.id
    req.token = token

    next()
  })
}

module.exports = verifyToken
