import React from 'react'
import { NavLink } from 'react-router-dom'

const UserDetails = props => (
  <div className="box container">
    <h3 className="title">User</h3>
    <label className="label">Id: {props.user.id}</label>
    <label className="label">Username: {props.user.username}</label>
    <label className="label">Email: {props.user.email}</label>
    <br />
    <NavLink className="button" to="/users">back</NavLink>
  </div>
)

export default UserDetails
