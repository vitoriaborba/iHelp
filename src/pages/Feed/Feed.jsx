import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md'

function Feed() {
  const [posts, setPosts] = useState([]);
  const storedToken = localStorage.getItem('authToken');
  const moment = require('moment');

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
            {post.author && 
            <>
              <div className='meta'>
                 
              <div className='location'>
                  <MdLocationOn
                size='15'
                color='#697d74'
                />
              <p>{post.location}</p>
                </div>
                <p>{moment(post.createdAt).fromNow()}</p>
              </div>
              
               <div>
                 <Link className='text-link userinfo' to={`/user/${post.author._id}`}>
                <img src={post.author.image} style={{borderRadius:50, width:30, height:30}} alt="" />
              <h6>{post.author.username}</h6>
              </Link>
            </div>
            <div className='postinfo'>
              <div className='image-description'>
                {post.image && (
             <img src={post.image} style={{maxWidth: 300,borderRadius:5}}alt="" /> 
            )}  
            <article>{post.description}</article>
              </div>
            
            <div className='comments'>
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
            </>
            }
          </div>
        );
      })} 
        </>
      )}
    </div>
  );
}

export default Feed;