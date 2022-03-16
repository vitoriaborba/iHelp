import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io'
import './ProfilePage.css' 
import Rating from '../../components/Rating/Rating';

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
      <img src={user.image} style={{width:220, height:220, borderRadius:50}} alt="" />
      <h2>Hello, {user.username}</h2>
    </div>
      <div className='profile-btns'>
        <button onClick={() => navigate(`/requests/${user._id}`)}>My requests</button>
        <button onClick={() => navigate(`/user/edit`)}>Edit Profile</button>
     <IoIosLogOut
        size='35'
        color='#0568c5'
        onClick={logoutUser}
      /> 
      </div>
      </>
       
    )}
      <hr />
      <Rating></Rating>
    </div>
  )
}

export default ProfilePage