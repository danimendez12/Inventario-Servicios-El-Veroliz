import React from 'react';
import '../estilos/ordenes.css';

// Recibe props: numero, estado, entrega, onDetalle (opcional)
const estadoConfig = {
  'Atrasada': { icon: 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
    <g clip-path="url(#clip0_140_585)">
    <g clip-path="url(#clip1_140_585)">
    <path d="M10 1.25C10.5547 1.25 11.0664 1.54297 11.3477 2.02344L19.7852 16.3984C20.0703 16.8828 20.0703 17.4805 19.793 17.9648C19.5156 18.4492 18.9961 18.75 18.4375 18.75H1.56252C1.00393 18.75 0.484398 18.4492 0.207054 17.9648C-0.0702894 17.4805 -0.0663832 16.8789 0.214867 16.3984L8.65237 2.02344C8.93362 1.54297 9.44534 1.25 10 1.25ZM10 6.25C9.48049 6.25 9.06252 6.66797 9.06252 7.1875V11.5625C9.06252 12.082 9.48049 12.5 10 12.5C10.5196 12.5 10.9375 12.082 10.9375 11.5625V7.1875C10.9375 6.66797 10.5196 6.25 10 6.25ZM11.25 15C11.25 14.6685 11.1183 14.3505 10.8839 14.1161C10.6495 13.8817 10.3315 13.75 10 13.75C9.6685 13.75 9.35056 13.8817 9.11614 14.1161C8.88172 14.3505 8.75002 14.6685 8.75002 15C8.75002 15.3315 8.88172 15.6495 9.11614 15.8839C9.35056 16.1183 9.6685 16.25 10 16.25C10.3315 16.25 10.6495 16.1183 10.8839 15.8839C11.1183 15.6495 11.25 15.3315 11.25 15Z" fill="#EF4444"/>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_140_585">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    <clipPath id="clip1_140_585">
    <path d="M0 0H20V20H0V0Z" fill="white"/>
    </clipPath>
    </defs>
    </svg>,   color: '#e53935', border: '#e53935', bg: '#fff5f5' },
  'A tiempo': { icon:
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
    <g clip-path="url(#clip0_140_599)">
    <g clip-path="url(#clip1_140_599)">
    <g clip-path="url(#clip2_140_599)">
    <path d="M9.99996 3.99984V8.99984L13.3333 10.6665M18.3333 8.99984C18.3333 13.6022 14.6023 17.3332 9.99996 17.3332C5.39759 17.3332 1.66663 13.6022 1.66663 8.99984C1.66663 4.39746 5.39759 0.666504 9.99996 0.666504C14.6023 0.666504 18.3333 4.39746 18.3333 8.99984Z" stroke="#FFBC1F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_140_599">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    <clipPath id="clip1_140_599">
    <path d="M0 0H20V20H0V0Z" fill="white"/>
    </clipPath>
    <clipPath id="clip2_140_599">
    <rect width="20" height="20" fill="white" transform="translate(0 -1)"/>
    </clipPath>
    </defs>
    </svg> , color: '#ffb800', border: '#ffb800', bg: '#fffbe5' },
  'Sin revisar': { icon: 
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 20H0V0H17.5V20Z" stroke="#E5E7EB"/>
    <g clip-path="url(#clip0_140_632)">
    <g clip-path="url(#clip1_140_632)">
    <path d="M1.98047 2.28516L0 6.25H8.125V1.25H3.66016C2.94922 1.25 2.30078 1.65234 1.98047 2.28516ZM9.375 6.25H17.5L15.5195 2.28516C15.1992 1.65234 14.5508 1.25 13.8398 1.25H9.375V6.25ZM17.5 7.5H0V16.25C0 17.6289 1.12109 18.75 2.5 18.75H15C16.3789 18.75 17.5 17.6289 17.5 16.25V7.5Z" fill="#757575"/>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_140_632">
    <rect width="17.5" height="20" fill="white"/>
    </clipPath>
    <clipPath id="clip1_140_632">
    <path d="M0 0H17.5V20H0V0Z" fill="white"/>
    </clipPath>
    </defs>
    </svg>
, color: '#888', border: '#bbb', bg: '#f7f7f7' },
  'Completada': { icon: 
    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 20H0V0H25V20Z" stroke="#E5E7EB"/>
    <g clip-path="url(#clip0_140_646)">
    <path d="M25 20H0V0H25V20Z" stroke="#E5E7EB"/>
    <path d="M19.6667 5L10.5 14.1667L6.33337 10" stroke="#10A242" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_140_646">
    <rect width="25" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
, color: '#2ecc40', border: '#2ecc40', bg: '#f5fff7' },
};

export default function OrdenCard({ numero, estado, entrega, onDetalle }) {
  const cfg = estadoConfig[estado] || estadoConfig['Sin revisar'];
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
