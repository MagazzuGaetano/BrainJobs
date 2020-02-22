const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const cors = require('cors')
const compress = require('compression')
const helmet = require('helmet')
const app = express()

app.use(helmet())                                       // security
app.use(compress())                                     // compression
app.use(cors({ origin: 'http://localhost' }))           // cross-origin
app.use(morgan('dev'))                                  // logger
app.use(bodyParser.urlencoded({ extended: true }))      // url-encoding
app.use(bodyParser.json())                              // json parser

const port = process.env.PORT || 8080

app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/auth', require('./routes/auth'))

// Not found middleware
app.use((req, res) => {
  return res.status(404).json({ 
    message: `Route ${req.url} Not found.` 
  })
})

// Error handler middleware
app.use(require('./middlewares/errors'))

// Initialize database
const db = require('./database')
db.init(!!process.argv[2] || false)

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at port ${port}`)
})
