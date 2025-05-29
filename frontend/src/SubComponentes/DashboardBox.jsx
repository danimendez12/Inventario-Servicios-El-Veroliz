import React from 'react';
import '../estilos.css';
import { useNavigate } from 'react-router-dom';

export default function DashboardBox({ icon, label, extraState }) {
  const navegar = useNavigate();

  const handleNavegacion = () => {
    navegar(`/DashboardAdmin/${label}`, { state: extraState });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavegacion();
    }
  };

  return (
    <div
      className="dashboard-box"
      onClick={handleNavegacion}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
      onFocus={(e) => e.currentTarget.classList.add('dashboard-box-hover')}
      onBlur={(e) => e.currentTarget.classList.remove('dashboard-box-hover')}
      onMouseEnter={(e) => e.currentTarget.classList.add('dashboard-box-hover')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('dashboard-box-hover')}
    >
      <div className="dashboard-box-icon">{icon}</div>
      <div className="dashboard-box-label" id={`dashboard-desc-${label}`}>{label}</div>
    </div>
  );
}
