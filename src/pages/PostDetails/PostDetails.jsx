import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './PostDetails.css'

function PostDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const {postId} = useParams();
  const [content, setContent] = useState('')
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isUpdated, setIsUpdated] = useState(true)

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
        <div className='post-d'>
          <div className='deletebtn'>
             <Link to={`/user/${postDetail.author._id}`}>
            <div className='userinfo'>
            <img src={postDetail.author.image} style={{width:25, height:20}} alt="" />
            <h6>{postDetail.author.username}</h6>
            </div>
          </Link> 
          <button onClick={deletePost}>X</button>
          </div>
            {postDetail.image && (
             <img src={postDetail.image} alt="" /> 
            )} 
            <article>{postDetail.description}</article>
          
            <h6>Comments</h6> 
             <hr />
          {postDetail.comments.map((comment)=> {
              return (
                <div key={comment._id}>
                  <div className='deletebtn'>
                   <Link to={`/user/${postDetail.author._id}`}>
                  <div className='userinfo'>
                  <img src={postDetail.author.image} style={{width:25, height:20}} alt="" />
                  <h6>{comment.author.username}</h6>
                  </div>
                  </Link>
                  <button onClick={() => deleteComment(comment._id)}>X</button>
                  </div>
                  <p>{comment.content}</p>
                  
                </div>
              );
            })}
         </div>
            <form onSubmit={handleCommentSubmit} method="post">
              <label htmlFor="addComment">New Comment</label>
              <input
                type="text"
                name="content"
                maxLength='100'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button id='deletebtn'type="submit">Send ✔</button>
            </form>  
        </>
      )}
   
    </div>
  )
}

export default PostDetails