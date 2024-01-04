// controllers/SignInController.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';

const SignInController = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default SignInController;