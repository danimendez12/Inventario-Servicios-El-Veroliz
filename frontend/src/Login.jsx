import React, { useState } from 'react';
import logoEmpresa from './logoEmpresa.svg';
import './estilos.css';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from './api';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navegar = useNavigate();
  
  const setUsuarioFuncion = (e) => {
    setUsuario(e.target.value);
  }
  
  const setContrasenaFuncion = (e) => {
    setContrasena(e.target.value);
  }

  const manejarEnvio = async () => {
    // Llama a la API para validar usuario y contraseña
    const resultado = await loginUsuario(usuario, contrasena);
    if (resultado.success) {
      setError('');
      navegar('/DashboardAdmin');
    } else {
      setError(resultado.message || 'Credenciales incorrectas');
    }
  };

  return (
    <div className='contenedorPrincipal' aria-label="Pantalla de inicio de sesión" role="main">
      <img src={logoEmpresa} alt="Logo de la empresa El Veroliz" className='logo' />
      <div className='formulario' aria-labelledby="login-bienvenida" tabIndex={0}>
        <h3 id="login-bienvenida" tabIndex={0} aria-label="Bienvenido de vuelta. Por favor inicie sesión con sus credenciales">¡Bienvenido de vuelta!</h3>
        <h2 className='textoRojo' tabIndex={0}>Por favor inicie sesión con sus credenciales</h2>
      </div>
      <div className='campoDatos' role="form" aria-label="Formulario de inicio de sesión">
        <label className='labelsLogin' htmlFor="input-usuario">Usuario</label>
        <input
          id="input-usuario"
          type="text"
          placeholder="Usuario"
          className='inputUsuario'
          value={usuario}
          onChange={setUsuarioFuncion}
          aria-label="Campo para ingresar el usuario"
          tabIndex={0}
        />
        <label htmlFor="input-contrasena">Contraseña</label>
        <input
          id="input-contrasena"
          type="password"
          placeholder="********"
          className='inputContrasena'
          value={contrasena}
          onChange={setContrasenaFuncion}
          aria-label="Campo para ingresar la contraseña"
          tabIndex={0}
        />
        {error && <div className='error' role="alert" tabIndex={0}>{error}</div>}
        <button className='botonSesion' onClick={manejarEnvio} aria-label="Iniciar sesión" tabIndex={0}>Iniciar Sesión</button>
      </div>
    </div>
  );
}

