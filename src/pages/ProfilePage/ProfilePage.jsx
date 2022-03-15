import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io'
import './ProfilePage.css' 
import Rating from '../../components/Rating/Rating';

function ProfilePage() {
  const  [user, setUser] = useState([])
  const {logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user)
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className='profile scroll'> 
    <div className='details'> 
      <img src={user.image} style={{width:220, height:220, borderRadius:50}} alt="" />
      <h2>Hello, {user.username}</h2>
    </div>
      <div className='profile-btns'>
        <button onClick={() => navigate(`/requests/${user._id}`)}>My requests</button>
        <button onClick={() => navigate(`/user/edit`)}>Edit Profile</button>
     <IoIosLogOut
        size='35'
        color='#0568c5'
        onClick={logoutUser}
      /> 
      </div>
   
     
      <hr />
      <Rating></Rating>
  {/*     <fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset> */}
    </div>
  )
}

export default ProfilePage