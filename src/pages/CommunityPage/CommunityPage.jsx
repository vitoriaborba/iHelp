import React, { useState } from 'react'
import Searchbar from '../../components/SearchBar/SearchBar'

function CommunityPage() {
  const  [users, setUsers] = useState('')

  const searchFilter = (searchQuery) => {
    let filteredUsers = users.filter((user) =>
      user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    console.log(filteredUsers);
    setUsers(filteredUsers);
  };

  return (
    <div>
  <h1>CommunityPage</h1>
  <Searchbar search={searchFilter} />

    </div>
  )
}

export default CommunityPage