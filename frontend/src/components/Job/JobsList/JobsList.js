import React from 'react'
import JobItem from '../JobItem/JobItem'

const JobsList = props => (
  <div className="container">
    {props.jobs.map(job => <JobItem key={job.job_id} job={job} />)}
  </div>
)

export default JobsList