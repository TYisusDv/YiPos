// controllers/SignInController.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import styles from "../assets/css/auth.module.css";

const SignInController = () => {
  return (
    <div className={styles.content}>
        <Routes>
            <Route path="/sign-in" element={<SignIn styles={styles}/>} />
        </Routes>
    </div>      
  );
};

export default SignInController;