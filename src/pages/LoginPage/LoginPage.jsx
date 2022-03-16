import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import './LoginPage.css'
 
function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();
 
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };
    const storedToken = localStorage.getItem('authToken');

 
    axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
      
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/feed');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div id='container'>
    <div className="LoginPage" id="loginform">
      <h1 id="headerTitle" >Login</h1>
      <div>
      <form onSubmit={handleLoginSubmit}>
      <div className="row">
        <label>Username:</label>
        <input 
          type="text"
          name="text"
          value={username}
          onChange={handleUsername}
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
        <button type="submit">Login</button>
        </div>
      </form>
      </div>
      
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      <div id="alternativeLogin">
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
    </div>
  )
}
 
export default LoginPage;