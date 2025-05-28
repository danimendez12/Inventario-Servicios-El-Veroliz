import React from 'react';
import '../estilos/ordenes.css';

// Recibe props: numero, estado, entrega, onDetalle (opcional)
const estadoConfig = {
  'Pendiente': {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="#E5E7EB" strokeWidth="2" fill="#fff5f5" />
        <path d="M10 5V11" stroke="#e53935" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="14.5" r="1" fill="#e53935" />
      </svg>
    ),
    color: '#e53935', border: '#e53935', bg: '#fff5f5'
  },
  'Completo': {
    icon: (
      <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="25" height="20" rx="4" fill="#f5fff7" stroke="#2ecc40" strokeWidth="2" />
        <path d="M19.6667 5L10.5 14.1667L6.33337 10" stroke="#10A242" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#2ecc40', border: '#2ecc40', bg: '#f5fff7'
  },
  'Sin revisar': {
    icon: (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="17.5" height="20" x="0.25" y="0.25" fill="#f7f7f7" stroke="#bbb" strokeWidth="0.5" />
        <circle cx="9" cy="10" r="3" fill="#bbb" />
      </svg>
    ),
    color: '#888', border: '#bbb', bg: '#f7f7f7'
  }
};

export default function OrdenCard({ numero, estado, entrega, onDetalle }) {
  const cfg = estadoConfig[estado] || estadoConfig['Sin revisar'];
  console.log('Configuración de estado:', numero);
  return (
    <div
      className="orden-card"
      style={{
        borderLeft: `6px solid ${cfg.border}`,
        background: cfg.bg,
        '--orden-neon': cfg.border
      }}
      onClick={onDetalle}
    >
      <div className="orden-card-izq">
        <span className="orden-icono" style={{color: cfg.color}}>{cfg.icon}</span>
        <div>
          <div className="orden-numero">Orden #{numero}</div>
          <div className="orden-estado" style={{color: cfg.color}}>{estado}</div>
          <div className="orden-entrega">Entrega: {entrega}</div>
        </div>
      </div>
      <button className="orden-detalle-btn" title="Ver detalle" onClick={e => { e.stopPropagation(); onDetalle && onDetalle(); }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_140_642)">
<path d="M10 0C9.44687 0 9 0.446875 9 1C9 1.55313 9.44687 2 10 2H12.5844L6.29375 8.29375C5.90312 8.68437 5.90312 9.31875 6.29375 9.70938C6.68437 10.1 7.31875 10.1 7.70937 9.70938L14 3.41563V6C14 6.55312 14.4469 7 15 7C15.5531 7 16 6.55312 16 6V1C16 0.446875 15.5531 0 15 0H10ZM2.5 1C1.11875 1 0 2.11875 0 3.5V13.5C0 14.8813 1.11875 16 2.5 16H12.5C13.8813 16 15 14.8813 15 13.5V10C15 9.44687 14.5531 9 14 9C13.4469 9 13 9.44687 13 10V13.5C13 13.775 12.775 14 12.5 14H2.5C2.225 14 2 13.775 2 13.5V3.5C2 3.225 2.225 3 2.5 3H6C6.55312 3 7 2.55312 7 2C7 1.44687 6.55312 1 6 1H2.5Z" fill="#DC2626"/>
</g>
<defs>
<clipPath id="clip0_140_642">
<path d="M0 0H16V16H0V0Z" fill="white"/>
</clipPath>
</defs>
        </svg>

      </button>
    </div>
  );
}
