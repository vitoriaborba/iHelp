import React, {useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {MdOutlineFeed, MdFeed } from 'react-icons/md'
import { RiSearchEyeFill } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg';
import { IoIosAddCircleOutline, IoIosAddCircle, IoIosLogOut } from 'react-icons/io'
import './NavBar.css'

function NavBar(props) {
  const {loggedIn, logoutUser} = useContext(AuthContext);
  const navigate = useNavigate()
  const [activeTabs, setActiveTabs] = useState(props.name)

 useEffect(() => {
    switch (activeTabs) {
        case 'feed':
            navigate('/feed')
            break;
        case 'search':
            navigate('/users')
            break;
        case 'publish':
            navigate('/post-create')
            break;
        case 'account':
            navigate('/user')
            break;
        default:
            navigate('/')
            break;
    }
}, [activeTabs]) 

  return (


    <>
{loggedIn && (
<>
    <div className='bottom-nav'>
            <div className='bn-tab'>
                {activeTabs === 'feed' ?
                    <MdOutlineFeed
                        size='35'
                        color='#0568c5'
                        onClick={() => setActiveTabs('feed')}
                    /> :
                    <MdFeed
                        size='35'
                        color='#BDBCBC'
                        onClick={() => setActiveTabs('feed')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'publish' ?
                    <IoIosAddCircleOutline
                        size='35'
                        color='#BDBCBC'
                        onClick={() => setActiveTabs('publish')}
                    /> :
                    <IoIosAddCircle
                        size='35'
                        color='#0568c5'
                        onClick={() => setActiveTabs('publish')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'search' ?
                    <BiSearchAlt
                        size='35'
                        color='#0568c5'
                        onClick={() => setActiveTabs('search')}
                    /> :
                    <RiSearchEyeFill
                        size='35'
                        color='#BDBCBC'
                        onClick={() => setActiveTabs('search')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'account' ?
                    <CgProfile
                        size='35'
                        color='#0568c5'
                        onClick={() => setActiveTabs('account')}
                    /> :
                    <CgProfile
                        size='35'
                        color='#BDBCBC'
                        onClick={() => setActiveTabs('account')}
                    />}
            </div>
            <div className='bn-tab'>
            {activeTabs === 'logout' ?
                    <IoIosLogOut
                        size='35'
                        color='#0568c5'
                        onClick={() => setActiveTabs({logoutUser})}
                    /> :
                    <IoIosLogOut
                        size='35'
                        color='#BDBCBC'
                        onClick={() => setActiveTabs(logoutUser)}
                    />}
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