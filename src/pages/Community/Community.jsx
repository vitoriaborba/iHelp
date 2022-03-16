import Searchbar from '../../components/SearchBar/SearchBar'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Community() {
  const  [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const searchFilter = (searchQuery) => {
    let filteredUsers = users.filter((user) =>
      user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <div className='searchPage'>
  <Searchbar search={searchFilter} />
  <div className='search'>
    {users.map((user)=> {
    return (
       <div className='users' key={user._id}>
       <Link className='text-link' to={`/user/${user._id}`}>
              <div >
              <img src={user.image} style={{width:35, height:30}} alt="" />
              <h6>{user.username}</h6>
              </div>
            </Link>
     </div>
    );
    
  })}
  </div>
  
    </div>
  )
}

export default Community