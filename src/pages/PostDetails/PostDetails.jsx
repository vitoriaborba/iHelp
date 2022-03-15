import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function PostDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const {postId} = useParams();
  const [content, setContent] = useState('')
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isUpdated, setIsUpdated] = useState(true)

  const deleteComment = (commentId) => {
    console.log(commentId)
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

  console.log(postDetail)


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
console.log(postDetail)
  return (
    <div className='scroll'>
      {postDetail && (
        <> 
        <Link to={`/user/${postDetail.author._id}`}>
            <div>
            <img src={postDetail.author.image} style={{width:25, height:20}} alt="" />
            <h6>{postDetail.author.username}</h6>
            </div>
          </Link> 
          {postDetail.image && (
             <img src={postDetail.image} alt="" /> 
            )} 
            <article>{postDetail.description}</article>
            <button onClick={deletePost}>Delete</button>
          {postDetail.comments.map((comment)=> {
              return (
                <div key={comment._id}>
                   
                  <div>
                  <img src={postDetail.author.image} style={{width:15, height:10}} alt="" />
                  <h6>{comment.author.username}</h6>
                  </div>
                  <p>{comment.content}</p>
                  <button onClick={() => deleteComment(comment._id)}>X</button>
                </div>
              );
            })}
            <form onSubmit={handleCommentSubmit} method="post">
              <label htmlFor="addComment">New Comment</label>
              <input
                type="text"
                name="content"
                maxLength='100'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button type="submit">▶</button>
            </form>  
        </>
      )}
   
    </div>
  )
}

export default PostDetails