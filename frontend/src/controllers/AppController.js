// controllers/AppController.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomeController from "./HomeController";
import SignInController from "./SignInController";
import { UserInfoModel } from "../models/UsersModel"; 
import styles from "../assets/css/app.module.css";

const AppController = () => {
  const [user, setUser] = useState(null);
  const [authenticationChecked, setAuthenticationChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if(user === true || user === null ){
        const response = await UserInfoModel();
        if (response.success) {
          setUser(response.user);
        } else {
          setUser(null);
        }
        setAuthenticationChecked(true);
      }
    };
  
    fetchData();
  }, [user]);  

  if (!authenticationChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route
            path="/auth/*"
            element={user ? <Navigate to="/" /> : <SignInController setUser={setUser} />}
          />
          <Route
            path="/*"
            element={user ? <HomeController user={user} setUser={setUser} /> : <Navigate to="/auth/sign-in" />}
          />         
        </Routes>
      </div>
    </Router>
  );
};

export default AppController;
