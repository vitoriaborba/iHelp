import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { MdAddAPhoto } from 'react-icons/md'
import './NewPost.css'

function NewPost() {
  const [locationInput, setLocationInput] = useState([]);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [location, setLocation] = useState("")

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const locationOptions = []

  useEffect(() => {
    axios
      .get(`https://geoptapi.org/municipio?`)
      .then((response) => {
        setLocationInput(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if(locationInput) {
      locationInput.forEach((location) => {
        const option = { value:`${location.toLowerCase()}`, label:`${location}`}
        locationOptions.push(option)
      })
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
//IMG
    const storedToken = localStorage.getItem('authToken');

    try{

    
    const uploadData = new FormData();
      uploadData.append("image", imageUrl);
      let upload;
      let body;

      if (!imageUrl) {
        console.log(uploadData)
        body = {location, description};
      } else {
        upload = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        uploadData,{ headers: { Authorization: `Bearer ${storedToken}`}})
        body = {location, description, image:upload.data.fileUrl };
      }
     
    

 
    console.log(body)
    await axios
      .post(`${process.env.REACT_APP_API_URL}/post-create/`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImageUrl(null);
        setDescription('');
        
        navigate(`/feed`);
      })
    }
      catch(error){
        console.log(error)
      }
  }

  return (
    <div className='newpost-form scroll'>
      <div className='ask'>
        <h3>Ask For Help</h3>
        <form onSubmit={handlePostSubmit} method='post'>
        
        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
          {locationInput.map((element) => {
              return(
                <option key={element} value={element}>{element}</option>
              )
          })}
        </select>

    
        <input type="file" id="file-upload" name='image' accept="image/png image/jpg" onChange={(e)=> setImageUrl(e.target.files[0])}/>


        <div className='searchPage flex-btn'>
        
        <textarea
          id='newpost'
          type="text"
          cols={40}
          rows={4}
          maxLength='280'
          name="description"
          placeholder='Your description here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        
        <div className='profile-btns'>
        
         <label htmlFor="file-upload" className="custom-file-upload">
        <MdAddAPhoto 
        size='30'
        color='#6d358d97'
        />
        </label> 
        </div>
         <button id='test' type="submit">Publish ✔</button>
        </div>
      </form>
      </div>
          
    </div>
  );
}
export default NewPost