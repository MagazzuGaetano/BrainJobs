const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const express = require('express')
const router = express.Router()

const config = require('../config')
const User = require('../models/user')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.post('/register', (req, res, next) => {
  let { username, password, email } = req.body

  if (username) username = username.trim()
  if (email) email = email.trim()
  if (password) password = bcrypt.hashSync(password.trim(), 8)

  User.create({
    username,
    email,
    password
  })
  .then(user => {
    if (!user) {
      return next({ message: 'registration failed' })
    }

    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })
    res.status(200).json({ auth: true, token: token })
  })
  .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
  if (!req.body.username)
    return next({ status: 400, message: 'username or email required' })

  if (!req.body.password)
    return next({ status: 400, message: 'password required' })

  User.findOne({ where:
    { [Op.or]: [
      { username: req.body.username },
      { email: req.body.username }
    ] }
  })
  .then(user => {
    if (!user)
      return res.status(404).json({ message: 'user not exists.' })

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({
        auth: false,
        token: null,
        message: 'password is not valid!'
      })
    }

    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })

    res.status(200).json({
      auth: true,
      token: token,
      username: user.username
    })
  })
  .catch(err => next(err))
})

module.exports = router
