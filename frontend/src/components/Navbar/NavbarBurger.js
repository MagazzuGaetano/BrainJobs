import React from 'react'

const NavbarBurger = props => (
  // eslint-disable-next-line
  <a role="button"
    data-target="navMenu" 
    aria-label="menu"
    aria-expanded="false"
    onClick={props.toggleMenu}
    className={`navbar-burger ${props.active ? 'is-active' : ''}`}
  >
    <span/>
    <span/>
    <span/>
  </a>
)

export default NavbarBurger