import React, {useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import { useNavigate } from 'react-router-dom'

import {FaHandsHelping} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg';
import { IoIosAddCircle } from 'react-icons/io'
import './NavBar.css'

function NavBar(props) {
  const {loggedIn} = useContext(AuthContext);
  const navigate = useNavigate()

  return (


    <>
{loggedIn && (
<>
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
                        onClick={() => navigate('/post-create')}
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
    </>
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