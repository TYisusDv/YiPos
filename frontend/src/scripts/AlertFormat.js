// scripts/AlertFormat.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/auth.module.css";

const AlertFormat = ({ setAlertMessage, type, title, message, autoHideTime}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setAlertMessage(null);
    }, 500);
  };

  useEffect(() => {
    if (autoHideTime) {
      const timeoutId = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setAlertMessage(null);
        }, 500);
      }, autoHideTime);

      return () => clearTimeout(timeoutId);
    }
  }, [autoHideTime, setAlertMessage]);

  return (
    <div className={`${styles.alert} ${styles[type]} ${isClosing ? styles.hide : styles.show}`}>
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
