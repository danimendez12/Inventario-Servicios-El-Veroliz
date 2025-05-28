import React from 'react';
import '../estilos/inventario.css';

export default function AccionesInventario({ botones }) {
  // botones: [{label, icon, onClick, isDisabled}]
  return (
    <div className="acciones-box">
      {botones.map((btn, idx) => (
        <button
          key={idx}
          className="acciones-btn"
          onClick={btn.onClick}
          disabled={btn.isDisabled}
        >
          <span style={{fontSize:'1.3em', marginRight:'10px'}}>{btn.icon}</span>
          {btn.label}
        </button>
      ))}
    </div>
  );
}
