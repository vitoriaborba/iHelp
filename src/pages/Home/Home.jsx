import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className='homepage'>
      <div className='image'>
        <img style={{width:400}}src="https://images.pling.com/img/00/00/52/78/02/1292217/125ac9300428bfa3aa0ec3da27361d679aad.png" alt="" />
      </div>
      <div className='row'>
      <button>About</button>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
    </div>
    </div>
    
  )
}

export default Home