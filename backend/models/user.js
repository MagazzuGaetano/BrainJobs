const Sequelize = require('sequelize')
const db = require('../database').db

const User = db.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'username already in use!'
    },
    validate: {
      notNull: {
        msg: 'username cannot be null!'
      },
      notEmpty: {
        args: true,
        msg: 'username cannot be empty!'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'email address already in use!'
    },
    validate: {
      notNull: {
        msg: 'email cannot be null!'
      },
      notEmpty: {
        args: true,
        msg: 'email cannot be empty!'
      },
      isEmail: {
        args: true,
        msg: 'invalid email!'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password cannot be null!'
      },
      notEmpty: {
        args: true,
        msg: 'password cannot be empty!'
      }
    }
  }
},
{
  undescored: true,
  timestamps: false
})

module.exports = User
