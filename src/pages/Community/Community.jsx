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
    <div className='searchPage scroll'>
      <h3 style={{paddingBottom:10}} >Search for Community Members</h3>
  <Searchbar search={searchFilter} />
  <div className='search'>
    {users.map((user)=> {
    return (
       <div className='users' key={user._id}>
       <Link className='text-link' to={`/user/${user._id}`}>
              <div className='search-user' >
              <img src={user.image} style={{borderRadius:50, width:75, height:75}} alt="" />
              <h6 style={{fontSize:15}}>{user.username}</h6>
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