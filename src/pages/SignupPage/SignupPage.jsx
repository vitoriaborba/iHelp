import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './SignupPage.css'
 

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
 
 
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };
    const storedToken = localStorage.getItem('authToken');
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
    .post(`${process.env.REACT_APP_API_URL}/signup/`, requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div id='container'>
    <div className="SignupPage" id="loginform">
      <h1 id="headerTitle">Sign Up</h1>
      <div>
      <form onSubmit={handleSignupSubmit}>
      <div className="row">
        <label>Username:</label>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
 </div>
      <div className="row">
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 </div>
 <div className="row">
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 </div>
 <div id="button" className="row">
        <button type="submit">Sign Up</button>
        </div>
      </form>
 </div>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      <div id="alternativeLogin">
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
      </div>
    </div>
    </div>
  )
}
 
export default SignupPage;