// controllers/HomeController.js
import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import Home from "../components/Home";
import ManageUsers from "../components/manage/Users";
import styles from "../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";

const HomeController = () => {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.img}></div>          
        </div>
        <div className={styles.user}>
          <div className={styles.info}>
            <p className={styles.name}>Yisus Navarri</p>
            <div className={styles.img}>
              <FontAwesomeIcon icon={faUser}/>
            </div>
          </div>
          <div className={styles.dropbox}>
          </div>          
        </div>
      </div>
      <div className={styles["main-content"]}>
        <div className={`${styles.navbar} ${styles.hidden}`}>
          <ul>
            <li className={styles.separator}>Menu</li>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faHome}/> Inicio</Link>
            </li>
            <li className={styles.separator}>Administración</li>
            <li>
              <Link to="/manage/users"><FontAwesomeIcon icon={faHome}/> Usuarios</Link>
            </li>
          </ul>
        </div>
        <div className={styles.main}>
          <div className={styles.view}>
            <Routes>
              <Route path="/" element={<Home styles={styles} />} />
              <Route path="/manage/users" element={<ManageUsers styles={styles} />} />
            </Routes>
          </div>
          <div className={styles.footer}>
            <p>© 2023 YiPos. Reservados todos los derechos.</p>
          </div>          
        </div>        
      </div>        
    </div>      
  );
};

export default HomeController;