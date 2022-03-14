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
    <div>
      <h4>Search for Community Members:</h4>
  <Searchbar search={searchFilter} />
  {users.map((user)=> {
    return (
       <div key={user._id}>
       <Link to={`/user/${user._id}`}>
              <div>
              <img src={user.image} style={{width:45, height:40, borderRadius:50}} alt="" />
              <h6>{user.username}</h6>
              </div>
            </Link>
     </div>
    );
    
  })}
    </div>
  )
}

export default CommunityPage