import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function WantToHelpPage() {
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
            <Link to={`/user/${post.author._id}`}>
              <div>
              <img src={post.author.image} style={{width:25, height:20}} alt="" />
              <h6>{post.author.username}</h6>
              </div>
            </Link>
            {post.image && (
             <img src={post.image} alt="" /> 
            )} 
            <article>{post.description}</article>

            <Link to={`/feed/${post._id}`}>
              {post.comments.length === 1 && (
                <h6>{post.comments.length} Comment</h6>
              )}
              {post.comments.length !== 1 && (
                <h6>{post.comments.length} Comments</h6>
              )}
              </Link>
          </div>
        );
      })}
    </div>
  );
}

export default WantToHelpPage;