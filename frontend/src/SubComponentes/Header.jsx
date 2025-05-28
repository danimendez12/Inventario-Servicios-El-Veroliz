import React from 'react'
import '../estilos.css';
import { useNavigate } from 'react-router-dom';

function Header  ({titulo,habilitado,textoBoton,onSubmit})  {
  const navigate = useNavigate();
  return (
    <div className='header'>
        <h1 className='titulos'>{titulo}</h1>
        <div className='header-botones'>
          {habilitado && (
            <button className='botonSalir' style={{marginRight: 12}} onClick={onSubmit}>
              {textoBoton || 'Acción'}
            </button>
          )}
          <button className='botonSalir' onClick={() => navigate(-1)} > Salir </button>
        </div>
    </div> 
  ) 
}

export default Header;
