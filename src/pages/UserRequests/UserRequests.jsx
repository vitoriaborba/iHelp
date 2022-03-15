import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function UserRequests() {
  const [UsersPosts, setUsersPosts] = useState([]);
  const [isDone, setisDone] = useState(false)
  const {userId} = useParams();

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/requests/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log(response.data)
      setUsersPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDoneInput = (e) => setisDone(e.target.checked);


  return (
    <div >
      <h3>Pending</h3>
        {UsersPosts.posts && (
          <>
          {UsersPosts.posts.map((post)=> {
             return (
               <div className='post' key={post._id}>
              <input type="checkbox" name="isDone" value={post.isDone} onChange={handleDoneInput} />
              <div className='description'>
                {post.image && (
                 <img src={post.image} alt="" /> 
                )} 
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
        <hr />
        <h3>Completed</h3>
        {UsersPosts.postsCompleted && (
          <>
          {UsersPosts.postsCompleted.map((post)=> {
             return (
               <div className='post' key={post._id}>
              <input type="checkbox" name="isDone" value={post.isDone} checked={true} onChange={handleDoneInput} />
              <div>
                {post.image && (
                 <img src={post.image} alt="" /> 
                )} 
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

export default UserRequests;