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

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      console.log(user._id + ' ' + userId) 


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
    setisDone(false)
  }, [postsCompleted, isDone]);

  // useEffect(() => {
  //     fetchPosts();
  //   }, []);



  const handleDoneInput = ((e) => {
    // setisDone(e.target.checked)
    console.log(e.target.checked)

    console.log(e.target.id);
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
            console.log(post.isDone)

            if(user._id === userId){
              return (
               <div className='requests' key={post._id}>
              <input id={post._id} type="checkbox" name="isDone" value={post.isDone} onChange={handleDoneInput} />
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
            }else{
              return (
                <div className='post' key={post._id}>
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

            }
            
             
                  
          })}          
          </>
        )}
        <h3>Completed</h3>
        {UsersPosts.postsCompleted && (
          <>
          {UsersPosts.postsCompleted.map((post)=> {
            console.log(post.isDone)

            if(user._id === userId){
            
             return (
               <div className='requests' key={post._id}>
                 
              <input id={post._id} type="checkbox" name="isDone" value={post.isDone} onChange={handleDoneInput} checked={post.isDone} />
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
                  }else{
                    return (
                      <div className='post' key={post._id}>
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
                  }
                   
          })}          
          </>
        )}
    </div>
  );
}

export default UserRequests;