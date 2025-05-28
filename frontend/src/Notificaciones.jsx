import React, { useState } from 'react';
import Header from './SubComponentes/Header';
import NotificacionCard from './SubComponentes/NotificacionCard';
import ModalNotificacion from './SubComponentes/ModalNotificacion';
import './estilos/notificaciones.css'
import { useLocation } from 'react-router-dom';


export default function Notificaciones() {

  // Recibe notificaciones y setNotificaciones desde DashboardAdmin
  const location = useLocation();
  const { notificaciones } = location.state || { notificaciones: [] };
  console.log("Notificaciones recibidas:", notificaciones);
  const [modalNoti, setModalNoti] = useState(null);
  const [leidas, setLeidas] = useState(notificaciones.map(n => !!n.leida));

  
  const handleDelete = noti => {
    console.log("Eliminando notificación:", noti);
  }

  const handleClick = idx => {
    setLeidas(leidas => leidas.map((l, i) => i === idx ? true : l));
    setModalNoti(notificaciones[idx]);
  };

  return (
    <div className="noti-main-bg">
      <Header titulo="Notificaciones" />
      <div className="noti-contenedor">
        <div className="noti-bandeja-bar">
          <span className="noti-bandeja-titulo">Bandeja</span>
          <button className="noti-marcar-todas" onClick={() => setLeidas(leidas.map(() => true))}>
            <span style={{color:'#e53935', fontWeight:600}}>✓ Marcar todas como leídas</span>
          </button>
        </div>
        <div className="noti-lista">
          {notificaciones.map((noti, idx) => (
            <NotificacionCard
              key={noti.id || idx}
              noti={{ ...noti, leida: leidas[idx] }}
              onClick={() => handleClick(idx)}
              onDelete={() => handleDelete(noti)}
            />
          ))}
        </div>
      </div>
      <ModalNotificacion noti={modalNoti} onClose={() => setModalNoti(null)} onDelete={handleDelete} />
    </div>
  );
}
