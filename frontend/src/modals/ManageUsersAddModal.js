// scripts/Modal.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faAlignJustify, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ManageUsersAddModel } from "../models/UsersModel"
import styles from "../assets/css/home.module.css";

const ManageUsersAddModal = () => {
    const [BtnSubmit, setBtnSubmit] = useState(
        <span>
          <FontAwesomeIcon icon={faPaperPlane} className={styles["mr-2px"]} /> Agregar
        </span>
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);    

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) {
            return;
        }
      
        setIsSubmitting(true);
        setBtnSubmit(
            <span>
              <div className={styles["preloader-circle"]}>
                <span className={styles["loader-circle"]}></span>
              </div>
            </span>
        );

        const response = await ManageUsersAddModel(username, password, firstname, lastname, email);
        setTimeout(function(){
            setIsSubmitting(false);
            setBtnSubmit(
                <span>
                    <FontAwesomeIcon icon={faPaperPlane} className={styles["mr-2px"]} /> Agregar
                </span>
            );

            console.log(response);
            if (response.success) {
                
                return;
            }    
            
            return;
        }, 1000);
    };

    return (
        <form onSubmit={handleAddSubmit}>
            <h3 className={`${styles["d-flex"]} ${styles["g-8px"]} ${styles["text-primary"]} ${styles["mb-2px"]}`}><FontAwesomeIcon icon={faLock} /> Acceso</h3>
            <div className={`${styles["form-input"]} ${styles["mb-2px"]}`}>
                <FontAwesomeIcon icon={faUser}/>
                <input 
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}             
                />
            </div>
            <div className={`${styles["form-input"]} ${styles["mb-20px"]}`}>
                <FontAwesomeIcon icon={faLock}/>
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}              
                />
            </div>
            <h3 className={`${styles["d-flex"]} ${styles["g-8px"]} ${styles["text-primary"]} ${styles["mb-2px"]}`}><FontAwesomeIcon icon={faUser} /> Datos</h3>
            <div className={`${styles["form-input"]} ${styles["mb-2px"]}`}>
                <FontAwesomeIcon icon={faAlignJustify}/>
                <input 
                    type="text"
                    placeholder="Nombre(s)"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}            
                />
            </div>
            <div className={`${styles["form-input"]} ${styles["mb-2px"]}`}>
                <FontAwesomeIcon icon={faAlignJustify}/>
                <input 
                    type="text"
                    placeholder="Apellido(s)"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}               
                />
            </div>
            <div className={`${styles["form-input"]} ${styles["mb-6px"]}`}>
                <FontAwesomeIcon icon={faEnvelope}/>
                <input 
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}          
                />
            </div>
            <button type="submit" className={`${styles.btn} ${styles["bg-primary"]} ${styles["float-end"]} ${styles["mb-6px"]}`} disabled={isSubmitting}>{BtnSubmit}</button>
        </form>
    );
};

export default ManageUsersAddModal;