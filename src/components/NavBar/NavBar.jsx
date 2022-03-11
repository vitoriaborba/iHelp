import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

function NavBar() {
  const {loggedIn, user, logoutUser} = useContext(AuthContext);
  return (
    <div>
      {loggedIn && (
       <nav>
      <NavLink to='/feed'>Want to Help?</NavLink>
      <NavLink to='/users'>Community</NavLink>
      <NavLink to='/user/:id'>Profile</NavLink>
    </nav>
    )}
    </div>
  )
}

export default NavBar