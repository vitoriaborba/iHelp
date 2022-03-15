import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function HelpDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const {postId} = useParams();
  const [content, setContent] = useState('')
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


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
  }, [content]);

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
    <div>
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
            
          {postDetail.comments.map((comment)=> {
              return (
                <div key={comment._id}>
                   
                  <div>
                  <img src={postDetail.author.image} style={{width:15, height:10}} alt="" />
                  <h6>{comment.author.username}</h6>
                  </div>
                  <p>{comment.content}</p>
                </div>
              );
            })}
            <form onSubmit={handleCommentSubmit} method="post">
              <label htmlFor="addComment">New Comment</label>
            {/*   <textarea name='content' cols='30' rows='2'></textarea>
 */}
              <input
                type="text"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button type="submit">Send</button>
            </form>  
        </>
      )}
   
    </div>
  )
}

export default HelpDetails