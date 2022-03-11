import React, {useContext} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

function NavBar() {
  const {loggedIn, user, logoutUser} = useContext(AuthContext);

  return (
    <div>
      
      <Link to="/"> Homepage</Link>
      {loggedIn && (
        <>
        <nav>
      <NavLink to='/feed'>Want to Help?</NavLink>
      <NavLink to='/users'>Community</NavLink>
      <NavLink to='/user/:id'>Profile</NavLink>
    </nav>
          <button onClick={logoutUser}>Logout</button>
        </>
      )}

      {/* {!loggedIn && (
        <>
          <Link to="/signup"> Signup</Link>
          <Link to="/login"> Login</Link>
        </>
      )} */}

    </div>
  )
}

export default NavBar