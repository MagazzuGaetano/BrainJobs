import React from 'react'

import JobDetails from '../../components/Job/JobDetails/JobDetails'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'


class JobPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      job: null,
      error: null
    }
  }

  componentWillMount() {
    if (!this.context.token) return this.props.history.push('/login')

    const { id } = this.props.match.params
    const options = {
      headers: {
        'Authorization': 'Bearer ' + this.context.token
      }
    }
    fetch(this.context.API_URL + '/jobs/' + id, options)
      .then(data => data.json())
      .then(data => {
        if (!data.message) 
          this.setState({job: data})
        else 
          this.setState({error: data.message})
      })
      .catch(err => console.log(err))
  }

  render() {
    const { job, error } = this.state
    return (
      <div className="container">
        {!error && job && <JobDetails key={job.job_id} job={job}/>}
        {error && <Notification message={error} />}
      </div>
    )
  }

}

export default JobPage