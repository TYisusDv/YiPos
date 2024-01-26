import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import HomeController from "./HomeController";
import SignInController from './SignInController';
import { userModelCheck } from '../models/userModel'; 
import "../assets/css/app.css";

const AppController = () => {
  const [user, setUser] = useState(null);
  const [authenticationChecked, setAuthenticationChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userModelCheck();
      if (response.success) {
        setUser(response.dataUser);
      } else {
        setUser(null);
      }
      setAuthenticationChecked(true);
    };
  
    fetchData();
  }, []);  

  if (!authenticationChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/auth/*"
            element={user ? <Navigate to="/" /> : <SignInController />}
          />
          <Route
            path="/*"
            element={user ? <HomeController /> : <Navigate to="/auth/sign-in" />}
          />         
        </Routes>
      </div>
    </Router>
  );
};

export default AppController;
