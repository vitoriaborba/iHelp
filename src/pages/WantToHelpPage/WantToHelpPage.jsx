import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NeedHelpPage from '../NeedHelpPage/NeedHelpPage';

function ProjectsListPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/feed`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log(response.data)
      setPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div >
    
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Link to={`/projects/${post._id}`}>
              <h6>{post.author.username}</h6>
            </Link>
            <h3>{post.description}</h3>

          </div>
        );
      })}
    </div>
  );
}

export default ProjectsListPage;