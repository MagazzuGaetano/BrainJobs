import React from 'react'
import { NavLink } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = props => {
  return (
    <div className="container">
      <div className="box">
        <h1 id="warning-title">File Not Found</h1>
        <p>The page you are looking for might have been removed,
            had its name changed, or is temporarily unavailable.</p>
        <h3 id="msg">Please try the following:</h3>
        <ul>
          <li>Check your spelling</li>
          <li>Return to the <NavLink to="/">home page</NavLink></li>
          <li>
            Click the
            <button 
              id="link-button"
              onClick={() => props.history.goBack()}
            >
            back
            </button>
            button
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NotFoundPage