import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io'
import './ProfilePage.css' 
import RatingFixed from '../../RatingFixed/RatingFixed';

function ProfilePage() {
  const  [user, setUser] = useState([])
  const {logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (  
  <div className='profile scroll'> 
    {user && (
      <>
      <div className='details'> 
      <img src={user.image} style={{width:220, height:220, borderRadius:50, marginBottom:20}} alt="" />
      <div class="animate">
      <div class="loader" >
      <h1 class="color-palette-title">Welcome, {user.username}</h1>
      </div> 
      </div>
    </div>
      <div className='profile-btn'>
        <button onClick={() => navigate(`/requests/${user._id}`)}>My Requests</button>
        <button onClick={() => navigate(`/user/edit`)}>Edit Profile</button>
     <IoIosLogOut
        size='35'
        color='#6AAC8B'
        onClick={logoutUser}
      /> 
      </div>
      </>
       
    )}
      <hr />
      <RatingFixed></RatingFixed>
    </div>
  )
}

export default ProfilePage