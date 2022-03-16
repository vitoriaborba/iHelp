import React, {useState} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import Community from '../../pages/Community/Community'

function Logo() {
  const [showSearch, setShowSearch] = useState(false)

  const toggleShow = () => {
    setShowSearch(!showSearch);
    console.log(showSearch);
  };
  return (
    <div logo-div>
      <div className="logo">
         <img  style={{width:30, marginLeft:20}}src="https://images.pling.com/img/00/00/52/78/02/1292217/125ac9300428bfa3aa0ec3da27361d679aad.png" alt="" />
         <BiSearchAlt
          type="checkbox" 
          id="nav"
          size='35'
          color='#BDBCBC'
          onClick={toggleShow}
          />
    </div>
    {showSearch && <Community/>}
    </div>
    
  )
}

export default Logo