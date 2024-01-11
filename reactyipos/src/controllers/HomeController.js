// controllers/HomeController.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

const HomeController = () => {
  return (
    <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </div>      
  );
};

export default HomeController;