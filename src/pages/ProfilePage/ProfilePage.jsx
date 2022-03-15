import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io'

function ProfilePage() {
  const  [user, setUser] = useState([])
  const {logoutUser} = useContext(AuthContext);

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
  console.log(user)
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className='scroll'>
     <Link to={`/requests/${user._id}`}>My requests</Link>
     <Link to={`/user/edit`}>Edit Profile</Link>
     <IoIosLogOut
        size='35'
        color='#0568c5'
        onClick={logoutUser}
      />
      <h2>Hello, {user.username}</h2>
      <img src={user.image} style={{width:220, height:200}} alt="" />
      <hr />
      <h3>Endorsements</h3>
      😊😐🙁
    </div>
  )
}

export default ProfilePage