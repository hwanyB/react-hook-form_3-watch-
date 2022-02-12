import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import { authService } from '../fbase';
import Navigation from './Navigation';
import Profile from 'routes/Profile';



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);


  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user)
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  
  }, []);

  return (
    <BrowserRouter isLoggedIn={isLoggedIn}>
      {isLoggedIn && <Navigation setIsLoggedIn />}
      {isLoggedIn ? (
        <Routes>
          <Route path='/' element={<Home userObj={userObj} />} />
          <Route path='/profile' element={<Profile userObj={userObj} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
