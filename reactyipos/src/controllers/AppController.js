// controllers/AppController.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import SignInController from './SignInController';
import '../assets/css/app.css';

const AppController = () => {
  const [user] = useState(null);

  return (
    <Router>
      <div className='container'>
        <Routes>
            <Route 
                path="/"
                element={
                    user ? (
                        <Home />
                    ) : (
                        <Navigate to="/auth/sign-in" />
                    )
                }
            />            
            <Route 
                path="/auth/*"
                element={
                    user ? (
                        <Navigate to="/" />
                    ) : (
                        <SignInController />
                    )
                } 
            />            
        </Routes>
      </div>
    </Router>
  );
};

export default AppController;
