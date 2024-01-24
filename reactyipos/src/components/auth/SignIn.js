// components/Home.js
import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faSignIn, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = ({styles}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        document.cookie = `authToken=${responseData.token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;

        window.location = '/';
      } else {
        console.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles["info-1"]}>
        <div className={styles.logo}>
          <img src={require('../../assets/img/logo-white.png')} alt="YiPos"/>
        </div>
        <div className={styles.information}>
          <h1>¡Bienvenido/a de nuevo!</h1>
          <p>Para mantenerte conectado al sistema, por favor, inicia sesión.</p>
          <a href="https://google.com" className={`${styles.btn} ${styles['btn-r-transparent']}`}>Registrarse</a>
        </div>
      </div>
      <div className={styles["info-2"]}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles["text-primary"]}>Inicio de sesión</h1>
            <p>Usa tu usuario y contraseña para acceder.</p>
            <div className={`${styles['form-input']} ${styles['mb-6px']}`}>
              <FontAwesomeIcon icon={faUser}/>
              <input 
                type="text" 
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={`${styles['form-input']} ${styles['mb-16px']}`}>
              <FontAwesomeIcon icon={faLock}/>
              <input 
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={`${styles.btn} ${styles['btn-primary']} ${styles['w-100']}`}><span><FontAwesomeIcon icon={faSignIn} className={styles["mr-2px"]}/> Iniciar sesión</span></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;