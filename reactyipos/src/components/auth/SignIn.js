// components/Home.js
import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignIn, faLock } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        navigate('/');
      } else {
        console.error('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='card'>
      <div className='info-1'>
        <div className='img'></div>
        <div className='information'>
          <h1>¡Bienvenido/a de nuevo!</h1>
          <p>Para mantenerte conectado al sistema, por favor, inicia sesión.</p>
          <a href='https://google.com' className='btn btn-r-transparent'>Registrarse</a>
        </div>
      </div>
      <div className='info-2'>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-primary'>Inicio de sesión</h1>
            <p>Usa tu usuario y contraseña para acceder.</p>
            <div className='form-input mb-6px'>
              <FontAwesomeIcon icon={faUser}/>
              <input 
                type='text' 
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-input mb-16px'>
              <FontAwesomeIcon icon={faLock}/>
              <input 
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'><span><FontAwesomeIcon icon={faSignIn} className='mr-2px'/> Iniciar sesión</span></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;