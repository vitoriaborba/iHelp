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
  const [image, setImage] = useState(null);
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

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const body = {location, description, image, user };

    const storedToken = localStorage.getItem('authToken');
    console.log(body)
    axios
      .post(`${process.env.REACT_APP_API_URL}/post-create/`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImage(null);
        setDescription('');
        
        navigate(`/feed`);
      })
      .catch((err) => console.log(err));

  }

  return (
    <div className='newpost scroll'>
      
      <h1 id="headerTitle">New Post</h1>
        <form onSubmit={handlePostSubmit} method='post'>
        {/* <Select options={locationOptions} value={location} onChange={(e) => setLocation(e.target.locationOptions.value)} /> */}

        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
          {locationInput.map((element) => {
              return(
                <option key={element} value={element}>{element}</option>
              )
          })}
        </select>

        <input type="file" id="file-upload" accept="image/png, image/jpg"/>

        <label htmlFor="description">Description:</label>
        <div className='flex-btn'>
        <input
          type="text"
          maxLength='280'
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='btn'>
         <label htmlFor="file-upload" class="custom-file-upload">
        <MdAddAPhoto 
        size='40'
        color='rgb(37, 94, 148)'
        />
        </label> 
        <button type="submit">Publish ✔</button>
        </div>
         
        </div>
      </form>
     
    </div>
  );
}
export default NewPost