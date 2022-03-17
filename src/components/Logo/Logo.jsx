import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate = useNavigate()
  return (
    <div className="logo">
         <img  style={{width:30, marginLeft:20}}src="https://images.pling.com/img/00/00/52/78/02/1292217/125ac9300428bfa3aa0ec3da27361d679aad.png" alt="" />
         <BiSearchAlt
          type="checkbox" 
          id="nav"
          size='35'
          color='#BDBCBC'
          onClick={() => navigate('/users')}
          />
    </div>
  )
}

export default Logo








