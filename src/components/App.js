import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import { authService } from '../fbase';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
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
