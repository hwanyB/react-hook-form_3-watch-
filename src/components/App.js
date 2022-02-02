import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import { authService } from '../fbase';



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {
          isLoggedIn ? (
            <Route path='/' element={<Home />} />
          ):(
            <Route path='/' element={<Auth />} />
          )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
