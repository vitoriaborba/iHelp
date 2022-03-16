import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/auth.context'
import { useNavigate } from 'react-router-dom'
import NewPost from '../../pages/NewPost/NewPost'


import {FaHandsHelping} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg';
import { IoIosAddCircle } from 'react-icons/io'
import './NavBar.css'

function NavBar() {
  const {loggedIn} = useContext(AuthContext);
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)

  const toggleShow = () => {
    setShowForm(!showForm);
    console.log(showForm);
  };
  return (
    <>
{loggedIn && (
<div className='newpost'> 
{showForm && 
            <NewPost></NewPost>
            }
    <div className='bottom-nav'>
   
            <div className='bn-tab'>
                    <FaHandsHelping
                        type="checkbox" 
                        id="nav"
                        size='35'
                        color='#BDBCBC'
                        onClick={() => navigate('/feed') }
                    />
            </div>
            <div className='bn-tab'>
                    <IoIosAddCircle
                        type="checkbox" 
                        id="nav"
                        size='35'
                        color='rgb(37, 94, 148)'
                        onClick={toggleShow}
                    />
            </div>
            <div className='bn-tab'>
               
                    <CgProfile
                    type="checkbox" 
                    id="nav"
                    size='35'
                    color='#BDBCBC'
                    onClick={() => navigate('/user')}
                    /> 
            </div>
            
        </div>
       
    </div>
    )}
  </>
/*     <div>
    
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

    </div> */
  )
}

export default NavBar