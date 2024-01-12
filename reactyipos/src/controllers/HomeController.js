// controllers/HomeController.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import styles from "../assets/css/home.module.css";

const HomeController = () => {
  return (
    <div className={styles.content}>
      <div className={styles.header}>

      </div>
      <div className={styles["main-content"]}>
        <div className={styles.navbar}>

        </div>
        <div className={styles.main}>
          <div className={styles.view}>
            <Routes>
              <Route path="/" element={<Home styles={styles} />} />
            </Routes>
          </div>
          <div className={styles.footer}>
            
          </div>          
        </div>        
      </div>        
    </div>      
  );
};

export default HomeController;