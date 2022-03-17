import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAddAPhoto } from 'react-icons/md'
import { AuthContext } from "../../context/auth.context";
 
function EditProfile(props) {
  const [username, setUsername] = useState("");
  const [setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  const handleUsername = (e) => setUsername(e.target.value);
 
 
  const handleEdit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken');
    
    try {
      const uploadData = new FormData();
      uploadData.append("image", image);

      const upload = await axios.post(
          `${process.env.REACT_APP_API_URL}/upload`,
          uploadData,
          { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      
  
    const requestBody = {username, image: upload.data.fileUrl};
  
    const updatedUser = await axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}`, requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    console.log(updatedUser)
      navigate('/user');

    }
    catch(error) {
      console.log(error)
    }
  };

  
  return (
    <div id='container'>
    <div className="EditProfile" id="loginform">
      <h1 id="headerTitle">Edit Profile</h1>
      <div>

        <form onSubmit={handleEdit}>
        <label htmlFor="file-upload" class="custom-file-upload">
        <MdAddAPhoto 
        size='40'
        color='rgb(37, 94, 148)'
        />
        </label> 
        <input type="file" id="file-upload" name='image' accept="image/png image/jpg" onChange={(e)=> setImage(e.target.files[0])}/>
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