import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function NeedHelpPage() {
  const [locationInput, setLocationInput] = useState('');
  const [getLocation, setGetLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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
  }, [getLocation]);

  if(locationInput) {
      locationInput.forEach((location) => {
        const option = { value:`${location.toLowerCase()}`, label:`${location}`}
        locationOptions.push(option)
      })
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const body = {locationOptions, description, image, user };

    console.log(body)

    axios
      .post(`${process.env.REACT_APP_API_URL}/post-create/`, body)
      .then((response) => {
        setImage(null);
        setDescription('');
        
        navigate(`/feed`);
      })
      .catch((err) => console.log(err));

  }

  return (
    <div>
       
      <form onSubmit={handlePostSubmit} method='post'>

        <Select options={locationOptions} />

        <input type="file" id="image_input" accept="image/png, image/jpg"/>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         <button type="submit">Publish</button>
      </form>

    </div>
  );
}
export default NeedHelpPage

