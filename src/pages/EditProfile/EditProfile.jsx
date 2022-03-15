import { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
 
function EditProfile(props) {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
 
  const navigate = useNavigate();
  
  const handleUsername = (e) => setUsername(e.target.value);
 
 
  const handleEdit = (e) => {
    e.preventDefault();
  
    const requestBody = {username, Image};
    const storedToken = localStorage.getItem('authToken');
  
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}`, requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        navigate('/user');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div id='container'>
    <div className="EditProfile" id="loginform">
      <h1 id="headerTitle">Edit Profile</h1>
      <div>

      <form onSubmit={handleEdit}>
      <input type="file" id="image_input" accept="image/png, image/jpg"/>
      <div className="row">
        <label>Username:</label>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
 </div>
 <div id="button" className="row">
        <button type="submit">Save</button>
        </div>
      </form>

 </div>
    </div>
    </div>
  )
}
 
export default EditProfile;