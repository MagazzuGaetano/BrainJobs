import React from 'react'

import NavbarBurger from './NavbarBurger'
import NavbarItem from './NavbarItem'
import NavbarItemsStart from './NavbarItemsStart'
import NavbarItemsEnd from './NavbarItemsEnd'

import Context from '../../context/Context'

import './Navbar.css'


class Navbar extends React.Component {

  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      activeMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu,
    })
  }

  render() {
    return (
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <NavbarItem name={"BrainJobs"} link={"/"}/>
          <NavbarBurger
            active={this.state.activeMenu}
            toggleMenu={this.toggleMenu}
          />
        </div>
        <div className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}>
          <NavbarItemsStart context={this.context}/>
          <NavbarItemsEnd context={this.context}/>
        </div>
      </nav>
    )
  }
}

export default Navbar
