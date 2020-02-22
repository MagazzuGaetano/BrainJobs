const Sequelize = require('sequelize')
const db = require('../database').db

const User = require('../models/user')

const Job = db.define('job', {
  job_id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  language: {
    type: Sequelize.ENUM('python', 'java', 'scala', 'r', 'c++', 'julia'),
    allowNull: false,
    validate: {
      isIn: [['python', 'java', 'scala', 'r', 'c++', 'julia']]
    }
  },
  framework: {
    type: Sequelize.ENUM('pytorch', 'tensorflow', 'caffe', 'keras', 'deeplearning4j', 'apache_mahout', 'apache_singa'),
    allowNull: true,
    validate: {
      isIn: [['pytorch', 'tensorflow', 'caffe', 'keras', 'deeplearning4j', 'apache_mahout', 'apache_singa']]
    }
  },
  dataset: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataset_datatype: {
    type: Sequelize.ENUM('csv', 'avro', 'json'),
    allowNull: false,
    validate: {
      isIn: [['csv', 'avro', 'json']]
    }
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('created', 'enqueued', 'building', 'running', 'terminated', 'failed', 'unknown'),
    allowNull: false,
    validate: {
      isIn: [['created', 'enqueued', 'building', 'running', 'terminated', 'failed', 'unknown']]
    }
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  }
},
{
  underscored: true,
  timestamps: false
})

Job.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Job
