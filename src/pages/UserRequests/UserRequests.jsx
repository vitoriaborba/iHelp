import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './UserRequests.css'


function UserRequests() {
  const [UsersPosts, setUsersPosts] = useState([]);
  const [isDone, setisDone] = useState(false)
  const {userId} = useParams();
  const [postsCompleted, setPostsCompleted] = useState('');
  const { user } = useContext(AuthContext);
  const moment = require('moment');

  
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');


      let response = await axios.get(`${process.env.REACT_APP_API_URL}/requests/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUsersPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    setisDone(false)
  }, [postsCompleted, isDone]);

  // useEffect(() => {
  //     fetchPosts();
  //   }, []);



  const handleDoneInput = ((e) => {
    // setisDone(e.target.checked)
    let body = {
      "isDone": e.target.checked
    }
    
    // const body = e.target.id;
    // const body = {postsCompleted, userId};
    const idOfPost = e.target.id;
    const storedToken = localStorage.getItem('authToken');
    
  
     axios
      .put(`${process.env.REACT_APP_API_URL}/feed/${idOfPost}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
       setisDone(true)
        navigate(`/requests/${userId}`);
      })
      .catch((err) => console.log(err)) 
  })


  return (
    <div className='scroll'>
      <h3>Pending</h3>
        {UsersPosts.posts && (
          <>
          {UsersPosts.posts.map((post)=> {

              return (
               <div className='requests' key={post._id}>
                 <h6 style={{color:'rgb(146, 154, 161)', paddingRight:20}}>{moment(post.createdAt).fromNow()}</h6>
                 {(user._id === userId) && 
                 <input id={post._id} type="checkbox" name="isDone" value={post.isDone} onChange={handleDoneInput} />
                  }
             
              <div className='description'>
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
             )
               
                               
          })}          
          </>
        )}
        <h3>Completed</h3>
        {UsersPosts.postsCompleted && (
          <>
          {UsersPosts.postsCompleted.map((post)=> {
           
             return (
               <div className='requests' key={post._id}>
                 <h6 style={{color:'rgb(146, 154, 161)', paddingRight:20}}>{moment(post.createdAt).fromNow()}</h6>
                {(user._id === userId) && 
                 <input id={post._id} type="checkbox" name="isDone" value={post.isDone} onChange={handleDoneInput} checked={post.isDone} />
                } 
             
              <div className='description'>
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