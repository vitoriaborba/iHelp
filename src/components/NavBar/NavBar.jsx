import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <NavLink to='/user/:id'>Profile</NavLink>
      <NavLink to='/users'>Community</NavLink>
      <NavLink to='/feed'>Want to Help?</NavLink>
    </nav>
  )
}

export default NavBar