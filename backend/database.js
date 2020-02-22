const config = require('./config')
const Sequelize = require('sequelize')

const db = new Sequelize(config.database)

// Set up data relationships
const models = db.models
Object.keys(models).forEach(name => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
})

// Recreate db with some data if force is true
const init = (force) => {
  const seed = require('./seed')

  // Sync to the database
  db.sync({ force })
    .then(() => force && seed())
    .then(() => console.log('Connection to the database has been established successfully.'))
    .catch(err => console.log('Unable to connect to the database:', err))
}

module.exports = { db, init }
