import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function NeedHelpPage() {
  const [locationInput, setLocationInput] = useState('');

  const [getLocation, setGetLocation] = useState('');

  const locationOptions = []

  useEffect(() => {
    axios
      .get(`https://geoptapi.org/municipio?`)
      .then((response) => {
        console.log(response.data);
        setLocationInput(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getLocation]);

  const handleLocationInput = (e) => setLocationInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setGetLocation(locationInput);
    // console.log(getLocation);
  };

  if(locationInput) {
      locationInput.forEach((location) => {
        const option = { value:`${location.toLowerCase()}`, label:`${location}`}
        locationOptions.push(option)
      })
  }

  console.log(locationOptions)

  //UseState
  //Render
  //Useffect (fetching)
  //Changing state
  //Component re-renders

  return (
    <div>
      
      {/* <Select onSubmit={handleSubmit}>
        <input type="text" name="locations" onChange={handleLocationInput} />
        <button>Search</button>
      </Select>
      {locations ? (
        <>
          <h1>{locations}</h1>
      
        </>
      ) : (
        <h1>No locations found</h1>
      )} */}
      <Select options={locationOptions} />
    </div>
  );
}

export default NeedHelpPage