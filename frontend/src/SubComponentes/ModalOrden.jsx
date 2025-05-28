import React from 'react';
import '../estilos/notificaciones.css';

const estadoConfig = {
  'Atrasada': { label: 'Atrasado', color: '#e53935', bg: '#ffeaea' },
  'A tiempo': { label: 'A tiempo', color: '#ffb800', bg: '#fffbe5' },
  'Sin revisar': { label: 'Sin revisar', color: '#888', bg: '#f7f7f7' },
  'Completada': { label: 'Completada', color: '#2ecc40', bg: '#eaffea' },
};

export default function ModalOrden({ orden, onClose, onDelete, onCompletar }) {
  if (!orden) return null;
  const cfg = estadoConfig[orden.estado] || estadoConfig['Sin revisar'];
  return (
    <div className="modal-noti-bg">
      <div className="modal-noti-card" style={{ minHeight: 320, maxWidth: 600 }}>
        <div className="modal-noti-header">
          <div className="modal-noti-avatar" />
          <div className="modal-noti-info">
            <div className="modal-noti-titulo">Orden #{orden.numero}</div>
            <div className="modal-noti-meta">
              <span>De: Sistema</span>
              <span>•</span>
              <span>Entrega: {orden.entregaCompleta || orden.entrega}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{
                background: cfg.bg,
                color: cfg.color,
                fontWeight: 600,
                borderRadius: 8,
                padding: '4px 14px',
                fontSize: '0.98rem',
                display: 'inline-block',
              }}>{cfg.label}</span>
            </div>
          </div>
          <div className="modal-noti-actions">
            <button className="modal-noti-delete" onClick={() => onDelete(orden)} title="Eliminar">
              <svg width="22" height="22" fill="none" stroke="#e53935" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 6h18" />
                <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
            <button className="modal-noti-close" onClick={onClose} title="Cerrar">
              <svg width="22" height="22" fill="none" stroke="#e53935" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <hr className="modal-noti-sep" />
        <div className="modal-noti-cuerpo" style={{ border: 'none', minHeight: 120 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            Detalles del pedido: <span style={{ fontWeight: 400 }}>número de orden {orden.numeroPedido || '2025-03-27-005'}.</span>
          </div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Productos solicitados:</div>
          <ul style={{ margin: 0, paddingLeft: 24, marginBottom: 10 }}>
            {orden.productos && orden.productos.length > 0 ? (
              orden.productos.map((prod, idx) => (
                <li key={idx} style={{ marginBottom: 2, fontWeight: 400 }}>
                  <input type="checkbox" checked readOnly style={{ marginRight: 6 }} />
                  {prod}
                </li>
              ))
            ) : (
              <li><input type="checkbox" checked readOnly style={{ marginRight: 6 }} />Producto de ejemplo</li>
            )}
          </ul>
          <div style={{ fontWeight: 600 }}>Fecha de solicitud: <span style={{ fontWeight: 400 }}>{orden.fechaSolicitud || '27 de marzo de 2025, 10:30 AM.'}</span></div>
          <div style={{ fontWeight: 600 }}>Cliente: <span style={{ fontWeight: 400 }}>{orden.cliente || 'Mario Chacón S.A'}</span></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px 12px 24px' }}>
          {orden.estado !== 'Completada' && (
            <button
              className="modal-orden-completar"
              style={{
                background: '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 32px',
                fontWeight: 600,
                fontSize: '1.05rem',
                cursor: 'pointer',
                marginTop: 10,
                boxShadow: '0 2px 8px rgba(229,57,53,0.08)'
              }}
              onClick={() => onCompletar(orden)}
            >
              Completar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
