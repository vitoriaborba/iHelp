// import React from 'react'
import React, { useState } from 'react';
import {Link} from 'react-router-dom'


function HomePage() {

  const [about, setAbout] = useState('');
  const [showAbout, setShowAbout] = useState(true);


  const toggleShow = () => {
    setShowAbout(!showAbout);

  };


  return (
    <div className='homepage'>
      <div className='image'>
        <img style={{width:400}}src="https://images.pling.com/img/00/00/52/78/02/1292217/125ac9300428bfa3aa0ec3da27361d679aad.png" alt="" />
      </div>
      <div className='row'>
    
      <button onClick={toggleShow}>{showAbout ? 'About' : 'About'}</button>
      {showAbout && (
        <>
        <h3>iHelp is a community made to help whoever is in need.</h3>
        </>
      )}


        
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
    </div>
    </div>
    
  )
}

export default HomePage