// scripts/Modal.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/home.module.css";

const Modal = ({ isOpen, closeModal, title, body }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setPosition({ x, y });
  };

  return (
    <>
      {isOpen && (
        <div className={styles["modal"]}>
          <Draggable 
            handle="#modal-header"
            bounds="parent"
            position={position}
            onDrag={handleDrag}
          >          
            <div className={styles["modal-content"]}>
              <div id="modal-header" className={styles["modal-header"]}>
                <h3>{title}</h3> 
                <FontAwesomeIcon icon={faTimes} className={styles["modal-close"]} onClick={closeModal} />
              </div>
              <div className={styles["modal-body"]}>
                {body}
              </div>
            </div>          
          </Draggable>
        </div>
      )}
    </>
  );
};

export default Modal;