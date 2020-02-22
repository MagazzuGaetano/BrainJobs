const bcrypt = require('bcryptjs')

const User = require('./models/user')
const Job = require('./models/job')

let jobs = (user_id) => [
  Job.create({ 
    title: 'job 1', 
    user_id, 
    language: 'python', 
    model: 'model 1', 
    dataset: 'dataset 1', 
    dataset_datatype: 'json', 
    status: 'created', 
    created_at: Date.now() 
  }),
  Job.create({ 
    title: 'job 2', 
    user_id, 
    language: 'julia', 
    model: 'model 2', 
    dataset: 'dataset 2', 
    dataset_datatype: 'csv', 
    status: 'created', 
    created_at: Date.now() 
  }),
  Job.create({ 
    title: 'job 3', 
    user_id, 
    language: 'python', 
    model: 'model 3', 
    framework: 'pytorch',
    dataset: 'dataset 3', 
    dataset_datatype: 'json', 
    status: 'created', 
    created_at: Date.now() 
  }),
]

module.exports = () => {
  return User.create({ 
    username: 'admin',
    email: 'admin@admin.it', 
    password:  bcrypt.hashSync('1234', 8)
  })
  .then(admin => Promise.all(jobs(admin.id)))
  .catch(error => console.log(error))
}
