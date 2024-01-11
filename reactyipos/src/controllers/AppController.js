import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeController from "./HomeController";
import SignInController from './SignInController';
import "../assets/css/app.css";

const AppController = () => {
  const [user, setUser] = useState(null);
  const [authenticationChecked, setAuthenticationChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

        if (!authToken) {
          setUser(null);
        } else {
          const response = await fetch("http://127.0.0.1:8000/api/user/info", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${authToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem("authToken");
            setUser(null);
          }
        }

        setAuthenticationChecked(true);
      } catch (error) {
        console.error("Error during authentication verification:", error);
        setUser(null);
        setAuthenticationChecked(true);
      }
    };

    checkAuthentication();
  }, []);

  if (!authenticationChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={user ? <HomeController /> : <Navigate to="/auth/sign-in" />}
          />
          <Route
            path="/auth/*"
            element={user ? <Navigate to="/" /> : <SignInController />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppController;
