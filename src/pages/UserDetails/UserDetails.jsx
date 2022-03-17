import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';
import './UserDetails.css'
import Rating from '../../components/Rating/Rating';

function UserDetails() {
  const  [user, setUser] = useState([])
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
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
    <div className='scroll'>
      <div className='details'> 
      <img src={user.image} style={{borderRadius:10, width:220}} alt="" /> 
     </div>
     <div className='profile-btns'>
        <button onClick={() => navigate(`/requests/${user._id}`)}>@ {(user.username)}'s requests</button>
      </div>
      <Rating></Rating>
    </div>
  )
}

export default UserDetails