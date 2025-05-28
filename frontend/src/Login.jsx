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
    // const resultado = await loginUsuario(usuario, contrasena);
    navegar('/DashboardAdmin');
    // if (resultado.success) {
    //   setError('');
    //   navegar('/DashboardAdmin');
    // } else {
    //   setError(resultado.message || 'Credenciales incorrectas');
    // }
  };

  return (
   
    <div className='contenedorPrincipal'>
      
    
        <img src= {logoEmpresa} alt="Logo" className='logo' />

      

    <div className='formulario'>   
        <h3>¡Bienvenido de vuelta!</h3>
        <h2 className='textoRojo'>Por favor inicie sesión con sus credenciales</h2>

    </div>

    <div className='campoDatos'>
        <label className='labelsLogin'>Usuario</label>
        <input
          type="text"
          placeholder="Usuario"
          className='inputUsuario'
          value={usuario}
          onChange={ setUsuarioFuncion}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          className='inputContrasena'
          value={contrasena}
          onChange={setContrasenaFuncion}
        />

        {error && <div className='error'>{error}</div>}

        <button className='botonSesion' onClick={manejarEnvio}>Iniciar Sesión</button>
      </div>
    </div>
  );
}

