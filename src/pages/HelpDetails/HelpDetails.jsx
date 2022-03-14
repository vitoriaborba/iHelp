import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


function HelpDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const {postId} = useParams();

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
  }, []);


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
            <form action="" method="post">
              <label htmlFor="addComment">New Comment</label>
              <textarea name='content' cols='30' rows='2'></textarea>
              <button type="submit">Send</button>
              </form>  
        </>
      )}
   
    </div>
  )
}

export default HelpDetails