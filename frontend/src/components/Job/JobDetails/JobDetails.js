import React from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'

import Code from '../../Code/Code'


const JobDetails = props => {
const {
    job_id,
    title,
    status,
    model,
    dataset,
    language,
    framework,
    created_at,
    dataset_datatype
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
        <h3 className="field">{title} ({status})</h3>            
        <Code
          type={"dataset_datatype: " + dataset_datatype}
          language={dataset_datatype}
          code={dataset} />
        <Code 
          type={
            "language: " + language + 
            (framework? (", framework: " + framework) : "")
          }
          language={language}
          code={model} />
        <br />
        <NavLink 
          className="button is-danger is-outlined"
          to="/jobs"
        >
          Back
        </NavLink>
    </div>
  )
}

export default JobDetails