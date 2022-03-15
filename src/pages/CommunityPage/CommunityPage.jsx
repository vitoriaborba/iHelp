import Searchbar from '../../components/SearchBar/SearchBar'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function CommunityPage() {
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
  console.log(users)
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
      <h3>Search for Community Members:</h3>
  <Searchbar search={searchFilter} />
  <div className='search'>
    {users.map((user)=> {
    return (
       <div className='users' key={user._id}>
       <Link className='text-link' to={`/user/${user._id}`}>
              <div className='searchUser'>
              <img src={user.image} style={{width:75, height:70}} alt="" />
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

export default CommunityPage