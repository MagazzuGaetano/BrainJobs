import React from 'react'
import { NavLink } from 'react-router-dom'

import JobsList from '../../components/Job/JobsList/JobsList'
import Notification from '../../components/Notification/Notification'

import Context from '../../context/Context'


class JobsPage extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      error: null
    }
  }

  componentWillMount() {
    if (!this.context.token) return this.props.history.push('/login')

    const options = {
      headers: {
          'Authorization': 'Bearer ' + this.context.token
      }
    }

    fetch(this.context.API_URL + '/jobs', options)
      .then(data => data.json())
      .then(data => {
        if (!data.message)
          this.setState({ jobs: data })
        else
          this.setState({ error: data.message })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { jobs, error } = this.state
    return (
      <div className="container">
        <NavLink
          className="button is-inverted is-info"
          style={{marginBottom: '15px'}}
          to='/jobs/add'>
          Add Training Request
        </NavLink>

        {jobs && jobs.length > 0 && !error && <JobsList jobs={jobs} />}

        {jobs && jobs.length <= 0 && <div className="box">No jobs yet</div>}

        {error && <Notification message={error} />}
      </div>
    )
  }

}

export default JobsPage