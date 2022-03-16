import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Feed() {
  const [posts, setPosts] = useState([]);
  const storedToken = localStorage.getItem('authToken');

  const fetchPosts = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/feed`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts)
 

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    
    <div className='container'>
      {posts && (
        <>
       {posts.map((post) => {
        return (
          <div className='post' key={post._id}>
            {post.author && <Link className='text-link' to={`/user/${post.author._id}`}>
              <div className='userinfo'>
              <img src={post.author.image} style={{width:25, height:20}} alt="" />
              <h6>{post.author.username}</h6>
              <p>{post.location}</p>
              </div>
            </Link>}
            {post.image && (
             <img src={post.image} style={{width:200}} alt="" /> 
            )} 
            <div className='comments'>
              <article>{post.description}</article>
            <Link className='text-link' to={`/feed/${post._id}`}>
              {post.comments.length === 1 && (
                <h6>{post.comments.length} Comment</h6>
              )}
              {post.comments.length !== 1 && (
                <h6>{post.comments.length} Comments</h6>
              )}
              </Link>
            </div>
          </div>
        );
      })} 
        </>
      )}
    </div>
  );
}

export default Feed;