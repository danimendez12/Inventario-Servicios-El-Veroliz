import React from 'react';
import '../estilos/notificaciones.css';

export default function ModalNotificacion({ noti, onClose, onDelete }) {
  if (!noti) return null;
  return (
    <div className="modal-noti-bg">
      <div className="modal-noti-card" style={{ minHeight: 260, maxHeight: 420 }}>
        <div className="modal-noti-header">
          <div className="modal-noti-avatar" />
          <div className="modal-noti-info">
            <div className="modal-noti-titulo">{noti.titulo}</div>
            <div className="modal-noti-meta">
              <span>De: Sistema</span>
              <span>•</span>
              <span>{noti.fechaCompleta || noti.fecha}</span>
            </div>
          </div>
          <div className="modal-noti-actions">
            <button className="modal-noti-delete" onClick={() => onDelete(noti)} title="Eliminar">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20H0.5V0H18V20Z" stroke="#E5E7EB"/>
                <g clip-path="url(#clip0_120_424)">
                <g clip-path="url(#clip1_120_424)">
                <path d="M7.16016 2.01562L6.41797 3.125H12.082L11.3398 2.01562C11.2812 1.92969 11.1836 1.875 11.0781 1.875H7.41797C7.3125 1.875 7.21484 1.92578 7.15625 2.01562H7.16016ZM12.9023 0.976562L14.3359 3.125H14.875H16.75H17.0625C17.582 3.125 18 3.54297 18 4.0625C18 4.58203 17.582 5 17.0625 5H16.75V16.875C16.75 18.6016 15.3516 20 13.625 20H4.875C3.14844 20 1.75 18.6016 1.75 16.875V5H1.4375C0.917969 5 0.5 4.58203 0.5 4.0625C0.5 3.54297 0.917969 3.125 1.4375 3.125H1.75H3.625H4.16406L5.59766 0.972656C6.00391 0.367188 6.6875 0 7.41797 0H11.0781C11.8086 0 12.4922 0.367188 12.8984 0.972656L12.9023 0.976562ZM3.625 5V16.875C3.625 17.5664 4.18359 18.125 4.875 18.125H13.625C14.3164 18.125 14.875 17.5664 14.875 16.875V5H3.625ZM6.75 7.5V15.625C6.75 15.9688 6.46875 16.25 6.125 16.25C5.78125 16.25 5.5 15.9688 5.5 15.625V7.5C5.5 7.15625 5.78125 6.875 6.125 6.875C6.46875 6.875 6.75 7.15625 6.75 7.5ZM9.875 7.5V15.625C9.875 15.9688 9.59375 16.25 9.25 16.25C8.90625 16.25 8.625 15.9688 8.625 15.625V7.5C8.625 7.15625 8.90625 6.875 9.25 6.875C9.59375 6.875 9.875 7.15625 9.875 7.5ZM13 7.5V15.625C13 15.9688 12.7188 16.25 12.375 16.25C12.0312 16.25 11.75 15.9688 11.75 15.625V7.5C11.75 7.15625 12.0312 6.875 12.375 6.875C12.7188 6.875 13 7.15625 13 7.5Z" fill="#DC2626"/>
                </g>
                </g>
                <defs>
                <clipPath id="clip0_120_424">
                <rect width="17.5" height="20" fill="white" transform="translate(0.5)"/>
                </clipPath>
                <clipPath id="clip1_120_424">
                <path d="M0.5 0H18V20H0.5V0Z" fill="white"/>
                </clipPath>
                </defs>
              </svg>

            </button>
            <button className="modal-noti-close" onClick={onClose} title="Cerrar">
              <svg width="22" height="22" fill="none" stroke="#e53935" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <hr className="modal-noti-sep" />
        <div className="modal-noti-cuerpo" style={{ border: 'none', minHeight: 120 }}>
          {noti.cuerpo || noti.descripcion}
        </div>
      </div>
    </div>
  );
}
