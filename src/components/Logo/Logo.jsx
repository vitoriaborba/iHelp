import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate = useNavigate()
  return (
    <div className="logo">
         <img style={{maxWidth:150}}src="https://res.cloudinary.com/vitoria/image/upload/v1647542300/movie-gallery/logo_ub3eh0.png" alt="" />
         <BiSearchAlt
          type="checkbox" 
          id="nav"
          size='35'
          color='white'
          onClick={() => navigate('/users')}
          />
    </div>
  )
}

export default Logo








