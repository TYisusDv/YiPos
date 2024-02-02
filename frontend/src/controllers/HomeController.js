// controllers/HomeController.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faUsers, faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Logout from "../components/auth/Logout";
import Home from "../components/Home";
import ManageUsers from "../components/manage/Users";
import Modal from "../scripts/Modal";
import styles from "../assets/css/home.module.css";
import "animate.css";

const HomeController = ({ user, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDropbox, setShowDropbox] = useState(false);
  const [dots, setDots] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [bodyModal, setBodyModal] = useState(false); 

  useEffect(() => {
    const preLoader = () => {
      setPreLoader();
    };

    preLoader();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots % 4) + 1);
    }, 300); 

    return () => clearInterval(intervalId);
  }, []);

  const handlePreLoader = () => {
    setPreLoader();
  };

  function setPreLoader(){
    setIsLoading(true);   

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);     
  }
  
  const handleToggleDropbox = () => {
    setShowDropbox(!showDropbox);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.img}></div>          
        </div>
        <div className={`${styles.user} ${showDropbox ? styles.show : ''}`} onClick={handleToggleDropbox}>
          <div className={styles.info}>
            <p className={styles.name}>{user.first_name} {user.last_name}</p>
            <div className={styles.img}>
              <FontAwesomeIcon icon={faUser}/>
            </div>
          </div>
          <div className={styles.dropbox}>
            <ul>
              <li>
                <Link to="/account/logout" onClick={handlePreLoader}><FontAwesomeIcon icon={faRightFromBracket}/> Cerrar sesión</Link>
              </li>
            </ul>
          </div>          
        </div>
      </div>
      <div className={styles["main-content"]}>
        <div className={`${styles.navbar} ${styles.hidden}`}>
          <ul>
            <li className={styles.separator}>Menu</li>
            <li>
              <Link to="/" onClick={handlePreLoader}><FontAwesomeIcon icon={faHome}/> Inicio</Link>
            </li>
            <li className={styles.separator}>Administración</li>
            <li>
              <Link to="/manage/users" onClick={handlePreLoader}><FontAwesomeIcon icon={faUsers}/> Usuarios</Link>
            </li>
          </ul>
        </div>
        <div className={styles.main}>
          <div className={styles.view}>
            {isLoading ? (
              <div className="animate__animated animate__fadeIn">
                <div className={styles.header}>
                    <div>
                      <h1>Cargando{Array(dots).fill(".").join("")}</h1>
                      <p>Por favor, espere.</p>
                    </div>
                    <ul>
                      <li>App</li>
                      <li>/</li>
                      <li className={styles.active}>Loading</li>
                    </ul>
                </div>
                <div className={styles["row-main"]}>
                  <p>Bienvenido a la página principal.</p>
                  
                </div>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account/logout" element={<Logout setUser={setUser}/>} />
                <Route path="/manage/users" element={<ManageUsers openModal={openModal} setTitleModal={setTitleModal} setBodyModal={setBodyModal} />} />
              </Routes>
            )}
          </div>
          <div className={styles.footer}>
            <p>© 2023 YiPos. Reservados todos los derechos.</p>
          </div>          
        </div>        
      </div>  
      <Modal isOpen={isModalOpen} closeModal={closeModal} title={titleModal} body={bodyModal}></Modal>      
    </div>      
  );
};

export default HomeController;