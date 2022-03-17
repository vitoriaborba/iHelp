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
              <p>{moment(post.updatedAt).format('HH:MM')}</p>
                <p>{moment(post.updatedAt).format('DD.MM.YY')}</p>
                <div className='location'>
                  <MdLocationOn
                size='15'
                color='rgb(81, 112, 143)'
                />
              <p>{post.location}</p>
                </div>
              </div>
              
               <div>
                 <Link className='text-link userinfo' to={`/user/${post.author._id}`}>
                <img src={post.author.image} style={{width:25, height:20}} alt="" />
              <h6>{post.author.username}</h6>
              </Link>
            </div>
            <div className='postinfo'>
            {post.image && (
             <img src={post.image} style={{width:200}} alt="" /> 
            )}  
            <article>{post.description}</article>

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