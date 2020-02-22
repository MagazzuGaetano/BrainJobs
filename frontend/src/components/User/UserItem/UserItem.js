import React from 'react'
import { NavLink } from 'react-router-dom'

import './UserItem.css'


const UserItem = ({ user, deleteUser }) => {
  return (
    <div className="box">
      <div className="level">
        <div className="level-left">
          <h4 className="title is-6">{user.id}</h4>
        </div>
        <div className="level-right">
          <NavLink 
            className="icon has-text-dark"
            to={"/users/" + user.id}
          >
            <i className="fas fa-info-circle"></i>
          </NavLink>
          <span
            id="rm-btn"
            className="icon has-text-dark" 
            onClick={() => deleteUser(user.id)}
          >
            <i className="fas fa-trash"></i>
          </span>
      </div>
      </div>
    </div>
  )
}

export default UserItem
