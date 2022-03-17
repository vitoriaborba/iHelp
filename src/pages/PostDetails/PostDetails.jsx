import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './PostDetails.css'
import { MdLocationOn } from 'react-icons/md'


function PostDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const {postId} = useParams();
  const [content, setContent] = useState('')
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isUpdated, setIsUpdated] = useState(true)
  const moment = require('moment');

  const deleteComment = (commentId) => {
    const storedToken = localStorage.getItem('authToken');

    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${commentId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then ((response)=> {
        setIsUpdated(false)
        navigate(`/feed/${postId}`);
      })
  }
  const deletePost = () => {
    const storedToken = localStorage.getItem('authToken');

    axios
      .delete(`${process.env.REACT_APP_API_URL}/feed/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then (()=> navigate(`/feed`))
  }
  const fetchPostDetail = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/feed/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setPostDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchPostDetail();
    setIsUpdated(true);
  }, [content, isUpdated]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const body = {content, user, postId};
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/comment/${postId}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setContent('')
        
        navigate(`/feed/${postId}`);
      })
      .catch((err) => console.log(err));

  }
  return (
    <div className='postdetails scroll'>
      {postDetail && (
        <>  
        <div className='post'>
        <div className='meta'>
                <div className='location'>
                  <MdLocationOn
                size='15'
                color='rgb(81, 112, 143)'
                />
              <p>{postDetail.location}</p>
              <p>{moment(postDetail.createdAt).fromNow()}</p>
                </div>
                {user.username === postDetail.author.username && (
            <button style={{borderRadius:50, width:15, height:15, fontSize:8, textAlign:'center'}} onClick={deletePost}>X</button>
            )}
              </div>
        <div>
                 <Link className='text-link userinfo' to={`/user/${postDetail.author._id}`}>
                <img src={postDetail.author.image} style={{borderRadius:50, width:30, height:30, textAlign:'center'}} alt="" />
              <h6>{postDetail.author.username}</h6>
              </Link>
            </div>
            <div className='postinfo'>
              <div className='image-description'>
                {postDetail.image && (
             <img src={postDetail.image} style={{maxWidth:300, borderRadius:5}}alt="" /> 
            )}  
            <article>{postDetail.description}</article>
              </div>
               <h6>Comments</h6> 
          {postDetail.comments.map((comment)=> {
              return (
                <div className='comment-div' key={comment._id}>
                  <div className='deletebtn'>
                    <div >
                   <Link className='text-link userinfo' to={`/user/${postDetail.author._id}`}>
                  <img src={comment.author.image} style={{borderRadius:50, width:30, height:30}} alt="" />
                  <h6>{comment.author.username}</h6> <h6 style={{color:'rgb(146, 154, 161)'}}>{moment(comment.createdAt).fromNow()}</h6>
                  </Link> 
                  
                  </div>
                  {user.username === comment.author.username && (
                    <button style={{borderRadius:50, width:15, height:15, fontSize:8}} onClick={() => deleteComment(comment._id)}>X</button>
                  )}  
                  </div>
                  <p>{comment.content}</p>
                  
                </div>
              );
            })}
            
            </div>
    
          <form onSubmit={handleCommentSubmit} method="post">
              <label htmlFor="addComment">
               <h6> New Comment</h6>
                </label>
              <div className='comment-form'>
                 <input
                type="text"
                name="content"
                maxLength='100'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button style={{borderRadius:5, width:35, height:25}} id='sendbtn'type="submit">✔</button>
              </div>
            </form>  
         </div>
           
        </>
      )}
   
    </div>
  )
}

export default PostDetails