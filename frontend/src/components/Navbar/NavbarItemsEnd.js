import React from 'react'
import NavbarItem from './NavbarItem'

const NavbarItemsEnd = ({context, toggleMenu}) => {
  return (
    <div className="navbar-end">
      {
        <span className="navbar-item">
            {context.username}
        </span>
      }
      <NavbarItem
        name={'Login'}
        link={'/login'}
        auth={false}
        isAuth={context.token}
        toggleMenu={toggleMenu}
      />
      <NavbarItem
        name={'Register'}
        link={'/register'}
        auth={false}
        isAuth={context.token}
        toggleMenu={toggleMenu}
      />
      <NavbarItem
        name={'Logout'}
        link={'/'}
        auth={true}
        isAuth={context.token}
        logout={context.logout}
        toggleMenu={toggleMenu}
      />
    </div>
  )
}

export default NavbarItemsEnd