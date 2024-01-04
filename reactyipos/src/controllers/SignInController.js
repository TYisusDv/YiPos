// controllers/SignInController.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import '../assets/css/auth.css';

const SignInController = () => {
  return (
    <div className='content'>
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
    </div>      
  );
};

export default SignInController;