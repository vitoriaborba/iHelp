// import React from 'react'
import React, { useState } from 'react';
import {Link} from 'react-router-dom'


function Home() {

  const [about, setAbout] = useState('');
  const [showAbout, setShowAbout] = useState(false);


  const toggleShow = () => {
    setShowAbout(!showAbout);

  };



  return (
    <div className='homepage'>
      <div className='image'>
      <img style={{width:450}}src="https://res.cloudinary.com/vitoria/image/upload/v1647544677/movie-gallery/iHelp_3_ih68ws.png" alt="" />
      </div>
      <div className='row'>
    
      <button onClick={toggleShow}>{showAbout ? 'About' : 'About'}</button>
      {showAbout && (
       <div className='about'>
       <h3>iHelp is a community created by Filipa Natalio & Vitoria Borba. Made to help whoever is in need, without asking anything in return.</h3>
       </div>
      )}


        
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
    </div>
    </div>
    
  )
}

export default Home