import React from 'react';
import '../estilos.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function NotificacionesBar({extraState}) {
   const navegar = useNavigate();
   const {notificaciones} =  extraState

   const handleNavegacion = () => {
    console.log("Navegando a Notificaciones con estado:", extraState);
      navegar(`/DashboardAdmin/Notificaciones`,  { state: {notificaciones} });
   };
  return (
    <div
      className="notificaciones-bar"
      tabIndex={0}
      role="button"
      aria-label="Ver notificaciones. Muestra alertas y mensajes importantes del sistema."
      aria-describedby="notificaciones-bar-desc"
      onClick={handleNavegacion}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavegacion();
        }
      }}
      onFocus={e => e.currentTarget.classList.add('notificaciones-bar-hover')}
      onBlur={e => e.currentTarget.classList.remove('notificaciones-bar-hover')}
      onMouseEnter={e => e.currentTarget.classList.add('notificaciones-bar-hover')}
      onMouseLeave={e => e.currentTarget.classList.remove('notificaciones-bar-hover')}
      style={{ outline: 'none' }}
    >
      <div className="notificaciones-header" id="notificaciones-bar-desc">
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
        </svg>

        <span className="notificaciones-titulo">Notificaciones</span>
      </div>
      <div className="notificaciones-lista">
        {notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((n, idx) => (
            <div className="notificacion-item" key={idx}>
              <div className="notificacion-titulo">{n.titulo}</div>
              <div className="notificacion-descripcion">{n.descripcion}</div>
            </div>
          ))
        ) : (
          <div className="notificacion-vacia">Sin notificaciones</div>
        )}
      </div>
    </div>
  );
}
