// components/Home.js
import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faSignIn, faLock } from "@fortawesome/free-solid-svg-icons";
import AlertFormat from "../../scripts/AlertFormat";
import { userModelAuth } from "../../models/userModel";

const SignIn = ({styles}) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [btnSubmitSpan, setBtnSubmitSpan] = useState(
    <span>
      <FontAwesomeIcon icon={faSignIn} className={styles["mr-2px"]} /> Iniciar sesión
    </span>
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setBtnSubmitSpan(
      <span>
        <div className={styles["preloader-circle"]}>
          <span className={styles["loader-circle"]}></span>
        </div>
      </span>
    )
    
    const response = await userModelAuth(username, password);

    setTimeout(function(){      
      if (response.success) {
        setAlertMessage({ type: "primary", title: "Exito!", message: response.msg });
        setTimeout(function(){
          window.location = "/";
        }, 2000);     
        return;
      }

      setIsSubmitting(false);
      setBtnSubmitSpan(
        <span>
          <FontAwesomeIcon icon={faSignIn} className={styles["mr-2px"]} /> Iniciar sesión
        </span>
      )
      setAlertMessage({ type: "danger", title: "Error!", message: response.msg, autoHideTime: 5000 });   
      return;
    }, 1000);
  };

  return (
    <div className={styles.card}>
      <div className={styles["info-1"]}>
        <div className={styles.logo}>
          <img src={require("../../assets/img/logo-white.png")} alt="YiPos"/>
        </div>
        <div className={styles.information}>
          <h1>¡Bienvenido/a de nuevo!</h1>
          <p>Para mantenerte conectado al sistema, por favor, inicia sesión.</p>
          <a href="https://google.com" className={`${styles.btn} ${styles["btn-r-transparent"]}`}>Registrarse</a>
        </div>
      </div>
      <div className={styles["info-2"]}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            {alertMessage && (
              <AlertFormat
                styles={styles}
                setAlertMessage={setAlertMessage}
                type={alertMessage.type}
                title_strong={alertMessage.title_strong}
                title={alertMessage.title}
                message={alertMessage.message}
                autoHideTime={alertMessage.autoHideTime}                
              />
            )}
            <h1 className={styles["text-primary"]}>Inicio de sesión</h1>
            <p>Usa tu usuario y contraseña para acceder.</p>
            <div className={`${styles["form-input"]} ${styles["mb-6px"]}`}>
              <FontAwesomeIcon icon={faUser}/>
              <input 
                type="text" 
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={`${styles["form-input"]} ${styles["mb-16px"]}`}>
              <FontAwesomeIcon icon={faLock}/>
              <input 
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={`${styles.btn} ${styles["btn-primary"]} ${styles["w-100"]}`} disabled={isSubmitting}>{btnSubmitSpan}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;