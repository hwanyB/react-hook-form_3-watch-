import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import { authService } from "./fbase";
import Navigation from "./components/Navigation";
import Profile from "routes/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          dsiplayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      dsiplayName: userObj.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    console.log(authService.currentUser);
  };

  return (
    <BrowserRouter base="/">
      {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home userObj={userObj} />} />
            <Route
              path='/profile'
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <>
            <Route path='/' element={<Auth isLoggedIn={isLoggedIn} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
