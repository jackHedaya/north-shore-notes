import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import useUser from '../hooks/useUser'
import useAuth from '../hooks/useAuth'

import NSN_Logo from '../assets/NSN_Logo.png'
import NSN_Logo_Text from '../assets/NSN_Logo_Text.png'

import './_styles/Navigation.scss'

function Navigation(props) {
  const { isLoggedIn } = useAuth()
  const user = useUser('ME')

  useEffect(() => {
    window.addEventListener('scroll', resizeHeaderOnScroll)
  }, [])

  const resizeHeaderOnScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      navBar = document.getElementById('navBar')

    if (distanceY > shrinkOn) {
      navBar.classList.add('resizeNavBar')
    } else {
      navBar.classList.remove('resizeNavBar')
    }
  }

  return (
    <ul className="navigation" id="navBar">
      <Link to="/" className="logo">
        <img
          src={NSN_Logo}
          className="logo"
          id="logo"
          alt="North Shore Hebrew Academy High School"
        />
        <img src={NSN_Logo_Text} className="logo" id="logo_text" alt="North Shore Notes" />
      </Link>
      <div className="tabs-container">
        <div className="other-tabs">
          <NavLink to="/about/">ABOUT</NavLink>
          <NavLink to="/student-art/">STUDENT ART</NavLink>
        </div>
        <div className="article-tabs">
          <NavLink to="/previous-issues/">PREVIOUS ISSUES</NavLink>
          <NavLink to="/last-week/">LAST WEEK</NavLink>
          <NavLink to="/this-week/">THIS WEEK</NavLink>
          <div className="drop-down-tab">
            {isLoggedIn && user && (
              <CustomDropdown name={user.first_name} redirect={props.history.push} />
            )}
          </div>
        </div>
      </div>
    </ul>
  )
}

const NavLink = withRouter(props => {
  const isSelected = () => props.location.pathname.includes(props.to)

  return (
    <li>
      <Link to={props.to} className={isSelected() ? 'selected' : null}>
        {props.children}
      </Link>
    </li>
  )
})

function CustomDropdown(props) {
  const { setIsLoggedIn, setToken, userRole } = useAuth()

  const signOut = () => {
    setToken(null)
    setIsLoggedIn(false)
    props.redirect('/')
  }

  const DropdownLink = ({ to, ...other }) => (
    <div className="link" onClick={() => props.redirect(to)} {...other} />
  )

  return (
    <div className="dropdown">
      <div className="greeting"> Hello, {props.name.toUpperCase()}</div>
      {userRole === 'ADMIN' && (
        <div className="dropdown-content">
          <DropdownLink to="/manage-users">Manage Users</DropdownLink>
          <DropdownLink to="/add-issue">Add Issue</DropdownLink>
          <div className="link" onClick={signOut}>
            Log out
          </div>
        </div>
      )}
    </div>

    // <Dropdown>
    //   <DropdownToggle caret className="greeting">
    //     HELLO, {props.name.toUpperCase()}
    //   </DropdownToggle>
    //   <DropdownMenu right>
    //     {userRole === 'ADMIN' && (
    //       <>
    //         <DropdownItem header>Admin</DropdownItem>
    //         <DropdownLink to="/manage-users">Manage Users</DropdownLink>
    //       </>
    //     )}
    //     <DropdownItem header>Editor</DropdownItem>
    //     <DropdownLink to="/add-issue">Add Issue</DropdownLink>
    //     <DropdownItem divider>Admin</DropdownItem>
    //     <DropdownItem onClick={signOut}>Log Out</DropdownItem>
    //   </DropdownMenu>
    // </Dropdown>
  )
}

export default withRouter(Navigation)
