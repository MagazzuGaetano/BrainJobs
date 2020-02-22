import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarItem = props => {
  const handleClick = () => {
    if (props.toggleMenu) props.toggleMenu()
    if (props.logout) props.logout()
  }

  const showComponent = () => {
    const showAuthlink = !props.auth && props.isAuth
    const showNotAuthLink = props.auth && !props.isAuth
    return showAuthlink || showNotAuthLink
  }

  return (
    <React.Fragment>
      {!showComponent() &&
      <NavLink className="navbar-item is-capitalized" 
        to={`${props.link}`}
        onClick={handleClick}>
        {props.name}
      </NavLink>}
    </React.Fragment>
  )
}

export default NavbarItem