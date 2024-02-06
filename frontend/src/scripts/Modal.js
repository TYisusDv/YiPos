// scripts/Modal.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/home.module.css";
import "animate.css";

const Modal = ({ setModal, title, body }) => {
  //const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  /*
  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setPosition({ x, y });
  };
  */

  const handleClose = () => {   
    setIsClosing(true);

    setTimeout(function(){
      setIsOpen(false);
      setModal(null);
    }, 500);
  };

  return (
    <div className={`animate__animated animate__faster animate__fadeIn ${isClosing ? "animate__fadeOut" : "animate__fadeIn"} ${isOpen ? styles["modal-show"] : styles["modal-hide"]} ${styles["modal"]}`}>
      <Draggable 
        handle="#modal-header"
        bounds="parent"
        position={{ x: 0, y: -100 }}
        //position={position}
        //onDrag={handleDrag}
      >          
        <div className={`${styles["modal-content"]}`}>
          <div id="modal-header" className={styles["modal-header"]}>
            <h3>{title}</h3> 
            <FontAwesomeIcon icon={faTimes} className={styles["modal-close"]} onClick={handleClose}/>
          </div>
          <div className={styles["modal-body"]}>
            {body}
          </div>
        </div>          
      </Draggable>
    </div>
  );
};

export default Modal;