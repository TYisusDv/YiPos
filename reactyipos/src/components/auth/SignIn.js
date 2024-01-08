// components/Home.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignIn } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  return (
    <div className='card'>
      <div className='info-1'>
        <div className='logo'>
          <div className='img'></div>
        </div>
        <div className='information'>
          <h1>¡Bienvenido/a de nuevo!</h1>
          <p>Para mantenerte conectado al sistema, por favor, inicia sesión.</p>
        </div>
      </div>
      <div className='info-2'>
        <div className='form'>
          <form>
            <h1>Inicio de sesión</h1>
            <div className='form-input mb-8px'>
              <FontAwesomeIcon icon={faUser}/>
              <input type='text' placeholder='Usuario'/>
            </div>
            <div className='form-input mb-10px'>
              <FontAwesomeIcon icon={faUser}/>
              <input type='password' placeholder='Contraseña'/>
            </div>
            <button type='submit' className='btn btn-primary w-100'><span><FontAwesomeIcon icon={faSignIn} className='mr-2px'/> Iniciar sesión</span></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;