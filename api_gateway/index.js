const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compress = require('compression')
const helmet = require('helmet')
const app = express()

app.use(helmet())                                       // security
app.use(compress())                                     // compression
app.use(cors())                                         // cross-origin
app.use(morgan('dev'))                                  // logger
app.use(bodyParser.urlencoded({ extended: true }))      // url-encoding
app.use(bodyParser.json())                              // json parser

const port = process.env.PORT || 8081

const jobsRoutes = require('./routes/jobs')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

const checkAuth = require('./middlewares/auth')

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', checkAuth, jobsRoutes)
app.use('/api/v1/users', checkAuth, usersRoutes)

// Not Found middleware
app.use((req, res) => {
  return res.status(404).json({
    message: `Route ${req.url} Not found.`
  })
})

// Error Handler middleware
app.use((err, req, res, next) => {
  let resp = err.response

  if (resp) {
    res.status(resp.status).json(resp.data)
  } else {
    res.status(500).json({
      message: 'Something goes wrong!',
      err
    })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway running at port ${port}`)
})
