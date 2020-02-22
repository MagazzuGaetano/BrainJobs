const axios = require('axios')
const express = require('express')
const router = express.Router()

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/auth'
})

// POST /login
// POST /register
router.post(/\/?(login|register)/, (req, res, next) => {
  api.post(req.path, req.body)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

module.exports = router
