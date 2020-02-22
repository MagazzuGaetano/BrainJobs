import React from 'react'
import NavbarItem from './NavbarItem'

const NavbarItemsStart = ({context, toggleMenu}) => {
  return (
    <div className="navbar-start">
      <NavbarItem
        name={'Home'}
        link={'/'}
        auth={true}
        isAuth={context.token}
        toggleMenu={toggleMenu}
      />
      <NavbarItem
        name={'Users'}
        link={'/users'}
        auth={true}
        isAuth={context.token}
        toggleMenu={toggleMenu}
      />
    </div>
  )
}

export default NavbarItemsStart