module.exports = (err, req, res, next) => {
  if (err.name && err.name === 'SequelizeValidationError') {
    let errors = undefined
    
    if (err.errors) {
      errors = err.errors.map(e => { 
        return { 
          message: e.message, 
          field: e.path 
        }
      })
    }

    return res.status(400).json({ 
      message: err.message, 
      errors 
    })
  }
  
  res.status(err.status || 500)
     .json({ message: err.message })
}
