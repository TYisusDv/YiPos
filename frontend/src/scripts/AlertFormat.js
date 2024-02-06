// scripts/AlertFormat.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/auth.module.css";
import "animate.css";

const AlertFormat = ({ setAlert, type, title, message }) => {
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {   
    setIsClosing(true);

    setTimeout(function(){
      setAlert(null);
    }, 500);
  };

  return (
    <div className={`animate__animated ${styles.alert} ${styles[type]} ${isClosing ? "animate__fadeOut" : "animate__fadeIn"}`}>
      <div className={styles.title}>
        <span>{title}</span> {message}
        <FontAwesomeIcon
          className={styles["btn-close"]}
          icon={faTimes}
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default AlertFormat;
