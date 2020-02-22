const express = require('express')
const router = express.Router()

const Job = require('../models/job')
const User = require('../models/user')

// GET /users/
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      if (users) {
        res.json(users)
      } else {
        next({ status: 404, message: 'users not found' })
      }
    })
    .catch(next)
})

// GET /users/:user_id
router.get('/:user_id', (req, res, next) => {
  let id = req.params.user_id

  User.findOne({ where: { id } })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        next({ status: 404, message: 'user not found' })
      }
    })
    .catch(next)
})

// DELETE /users/:user_id
router.delete('/:user_id', (req, res, next) => {
  let id = req.params.user_id

  User.destroy({ where: { id } })
    .then(count => {
      if (count) {
        res.json({ deleted: count })
      } else {
        next({ status: 404, message: 'user not found' })
      }
    })
    .catch(next)
})

// GET /users/:user_id/jobs
router.get('/:user_id/jobs', (req, res, next) => {
  let user_id = req.params.user_id

  Job.findAll({ where: { user_id } })
    .then(jobs => {
      if (jobs) {
        res.json(jobs)
      } else {
        next({ status: 404, message: 'jobs not found' })
      }
    })
    .catch(next)
})

// GET /users/:user_id/jobs/:job_id
router.get('/:user_id/jobs/:job_id', (req, res, next) => {
  let job_id = req.params.job_id
  let user_id = req.params.user_id

  Job.findOne({ where: { user_id, job_id } })
    .then(job => {
      if (job) {
        res.json(job)
      } else {
        next({ status: 404, message: 'job not found' })
      }
    })
    .catch(next)
})

// POST /users/:user_id/jobs
router.post('/:user_id/jobs', (req, res, next) => {
  let user_id = req.params.user_id

  let created_at = Date.now()
  let status = 'created'
  
  let required = ({
    title, 
    language, 
    framework, 
    dataset, 
    dataset_datatype, 
    model 
  } = req.body)

  for (let field in required) {
    if (field === 'model' || field === 'dataset') continue
    required[field] = required[field].toLowerCase()
  }

  User.findOne({ where: { id: user_id } })
    .then(user => {
      if (!user)
        return next({ status: 400, message: 'invalid user' })

      return Job.create({ created_at, status, user_id, ...required })
    })
    .catch(next)
    .then(job => {
      if (job) {
        res.location(job.job_id)
        res.status(201).json(job)
      } else {
        next({ status: 422, message: 'not created' })
      }
    })
    .catch(next)
})

module.exports = router
