import React from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'


const JobItem = props => {
  const {
    job_id,
    title,
    status,
    language,
    framework,
    created_at
  } = props.job
  return (
    <div className="box">
      <div className="level">
        <div className="level-left">
        <h4 className="title is-6">#{job_id}</h4>
        </div>
        <div className="level-right">
          <Moment format="DD/MM/YYYY HH:mm">
            {created_at}
          </Moment>
        </div>
      </div>
      <h3 style={{margin: '10px 0px !important'}}>
          {title} ({status})
      </h3>
      <div className="level is-mobile">
        <div className="level-left">
          language: {language} 
          {framework && ", framework: " + framework}
        </div>
        <div className="level-right">
          <NavLink to={"/jobs/" + job_id}>
            <span className="button is-outlined is-info">
              details
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default JobItem
