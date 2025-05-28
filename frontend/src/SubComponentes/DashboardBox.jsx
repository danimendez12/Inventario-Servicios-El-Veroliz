import React from 'react';
import '../estilos.css';
import { useNavigate } from 'react-router-dom';

export default function DashboardBox({ icon, label, extraState }) {
  const navegar = useNavigate();

  const handleNavegacion = () => {
    navegar(`/DashboardAdmin/${label}`, { state: extraState });
  }

  return (
    <div className="dashboard-box" onClick={handleNavegacion}>
      <div className="dashboard-box-icon">{icon}</div>
      <div className="dashboard-box-label">{label}</div>
    </div>
  );
}
