import React, { useState, useEffect } from 'react'
import Login from './components/login'
import Register from './components/register'
import Templates from './components/Templates'
import Generator from './components/Generator'
import Meme from './components/Meme'
import Profile from './components/Profile'
import './App.css'
import axios from 'axios'

function App() {

  const [currentPage, setCurrentPage] = useState('login');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userBio, setUserBio] = useState('');
  const [profilePic, setProfilePic] = useState("https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon-by-vexels.png");
  const [bearer, setBearer] = useState('');
  const [userInfo, setUserInfo] = useState();
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [meme, setMeme] = useState();



  return (
    <div className=" container-fluid bg-primary py-4">
      {currentPage === 'login' &&
        <Login
          setCurrentPage={setCurrentPage}
          setUserEmail={setUserEmail}
          userEmail={userEmail}
          setUserPassword={setUserPassword}
          userPassword={userPassword}
          setBearer={setBearer}
          bearer={bearer}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          currentPage={currentPage}
        />
      }
      {currentPage === 'register' &&
        <Register
          setCurrentPage={setCurrentPage}
          setUserEmail={setUserEmail}
          userEmail={userEmail}
          setUserPassword={setUserPassword}
          userPassword={userPassword}
          setUsername={setUsername}
          username={username}
          setUserBio={setUserBio}
          userBio={userBio}
          setProfilePic={setProfilePic}
          profilePic={profilePic}
        />
      }
      {currentPage === 'templates' &&
        <Templates
          setCurrentPage={setCurrentPage}
          userInfo={userInfo}
          templates={templates}
          setTemplates={setTemplates}
          template={template}
          setTemplate={setTemplate}
          setCurrentPage={setCurrentPage}
          setBearer={setBearer}
          bearer={bearer}
          setUserInfo={setUserInfo}
        />
      }
      {currentPage === 'generator' &&
        <Generator
          setCurrentPage={setCurrentPage}
          userInfo={userInfo}
          templates={templates}
          setTemplates={setTemplates}
          template={template}
          setTemplate={setTemplate}
          setCurrentPage={setCurrentPage}
          setCaptions={setCaptions}
          captions={captions}
          meme={meme}
          setMeme={setMeme}
        />
      }
      {currentPage === 'meme' &&
        <Meme
          meme={meme}
          userInfo={userInfo}
          setCurrentPage={setCurrentPage}
          setUserInfo={setUserInfo}
          bearer={bearer}
        />
      }
      {currentPage === 'profile' &&
        <Profile
          userInfo={userInfo}
          setCurrentPage={setCurrentPage}
          bearer={bearer}
          setUserInfo={setUserInfo}
          setBearer={setBearer}
        />
      }

    </div>
  )
}

export default App
