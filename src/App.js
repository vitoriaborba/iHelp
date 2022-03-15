import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
import React, { useContext } from 'react';

import IsAnon from './components/IsAnon/IsAnon';
import IsPrivate from './components/IsPrivate/IsPrivate';
import NavBar from './components/NavBar/NavBar';

import CommunityPage from './pages/CommunityPage/CommunityPage';
import EditProfile from './pages/EditProfile/EditProfile';
import HelpDetails from './pages/HelpDetails/HelpDetails';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NeedHelpPage from './pages/NeedHelpPage/NeedHelpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import UserRequests from './pages/UserRequests/UserRequests';
import WantToHelpPage from './pages/WantToHelpPage/WantToHelpPage';
import UserDetails from './pages/UserDetails/UserDetails';
import Logo from './components/Logo/Logo';

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className='flex' >
      <Logo></Logo>
    <Routes>
 
      <Route path="/" element= {<HomePage />} />


      <Route path="/login" element= {
      <IsAnon>
      <LoginPage />
      </IsAnon>
    } 
      />
      <Route 
      path="/signup" 
      element= {
      <IsAnon>
      <SignupPage />
      </IsAnon>
    } 
      />
      <Route 
      path="/user" 
      element= {
      <IsPrivate>
       <ProfilePage/>
      </IsPrivate>
    } 
      />
         <Route 
      path="/user/:id" 
      element= {
      <IsPrivate>
       <UserDetails/>
      </IsPrivate>
    } 
      />
      <Route path="/user/edit" element= {
      <IsPrivate>
       <EditProfile/>
      </IsPrivate>
    } 
      />
      <Route path="/users" element= {
      <IsPrivate>
      <CommunityPage/>
      </IsPrivate>
    } 
      />
      <Route path="/post-create" element= {
        <IsPrivate>
      <NeedHelpPage/>
      </IsPrivate>
    } 
      />
      <Route path="/feed" element= {
         <IsPrivate>
           <WantToHelpPage/>
         </IsPrivate>
    } 
      />
      <Route path="/feed/:postId" element= {
        <IsPrivate>
      <HelpDetails/>
      </IsPrivate>
    } 
      />
      <Route path="/requests/:userId" element= {
        <IsPrivate>
      <UserRequests/>
      </IsPrivate>
    } 
      />
    </Routes>
    <NavBar/>
    </div>
  );
}

export default App;
