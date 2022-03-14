import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ProfilePage() {
  const  [user, setUser] = useState([])
  const {id} = useParams();

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
  console.log(user)
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage