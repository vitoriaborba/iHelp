import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <button>About</button>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
      
    </div>
  )
}

export default HomePage