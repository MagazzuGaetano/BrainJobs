const axios = require('axios')
const express = require('express')
const router = express.Router()

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/users'
})

// GET /users
// GET /users/me (authenticated user)
// GET /users/userId
router.get('/:userId?', (req, res, next) => {
  let userId = req.params.userId || ''
  if (userId === 'me') userId = req.userId

  api.get(`/${userId}`)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

// DELETE /users/userId
router.delete('/:userId', (req, res, next) => {
  let userId = req.params.userId

  api.delete(`/${userId}`)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

module.exports = router
