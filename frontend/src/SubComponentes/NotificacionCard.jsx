import React from 'react';
import '../estilos/notificaciones.css';

// noti: { id, titulo, descripcion, fecha, leida, icono }
export default function NotificacionCard({ noti, onClick, onDelete }) {
  // Limita la descripción a 65 caracteres
  const descPreview =
    noti.descripcion && noti.descripcion.length > 65
      ? noti.descripcion.slice(0, 65) + '...'
      : noti.descripcion;
  const defaultIcon = (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5 20H0V0H17.5V20Z" stroke="#E5E7EB" />
      <g clipPath="url(#clip0_114_307)">
        <g clipPath="url(#clip1_114_307)">
          <path
            d="M1.98047 2.28516L0 6.25H8.125V1.25H3.66016C2.94922 1.25 2.30078 1.65234 1.98047 2.28516ZM9.375 6.25H17.5L15.5195 2.28516C15.1992 1.65234 14.5508 1.25 13.8398 1.25H9.375V6.25ZM17.5 7.5H0V16.25C0 17.6289 1.12109 18.75 2.5 18.75H15C16.3789 18.75 17.5 17.6289 17.5 16.25V7.5Z"
            fill="#EF4444"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_114_307">
          <rect width="17.5" height="20" fill="white" />
        </clipPath>
        <clipPath id="clip1_114_307">
          <path d="M0 0H17.5V20H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  return (
    <div
      className="noti-card"
      style={{
        borderLeft: `5px solid ${noti.leida ? '#bbb' : '#e53935'}`,
        background: '#fff',
        '--noti-neon': noti.leida ? '#bbb' : '#e53935',
      }}
      onClick={onClick}
    >
      <div className="noti-card-izq">
        <span className="noti-icono">{defaultIcon}</span>
        <div>
          <div className="noti-titulo">{noti.titulo}</div>
          <div className="noti-desc">{descPreview}</div>
          <div className="noti-fecha">{noti.fecha}</div>
        </div>
      </div>
      
    </div>
  );
}
