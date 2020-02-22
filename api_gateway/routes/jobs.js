const axios = require('axios')
const express = require('express')
const router = express.Router()

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/'
})

// GET /jobs
// GET /jobs/job_id
router.get('/:jobId?', (req, res, next) => {
  const jobId = req.params.jobId || ''

  api.get(`/users/${req.userId}/jobs/${jobId}`)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

// POST /jobs
router.post('/', (req, res, next) => {
  api.post(`/users/${req.userId}/jobs`, req.body)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

module.exports = router
