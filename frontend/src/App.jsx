import { useState } from 'react'
import './App.css'
import ReactDOM from 'react-dom/client';
import { Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DashboardAdmin from './DashboardAdmin';
import Inventario from './Inventario';
import Reportes from './Reportes';
import Predicciones from './Predicciones';
import Ordenes from './Ordenes';
import Notificaciones from './Notificaciones';
import Ayuda from './Ayuda';
function App() {

    
  return (
    
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/DashboardAdmin/Inventario" element={<Inventario />} />
      <Route path="/DashboardAdmin/Reportes" element={<Reportes />} />
      <Route path="/DashboardAdmin/Predicciones" element={<Predicciones />} />
      <Route path="/DashboardAdmin/Ordenes" element={<Ordenes />} />
      <Route path="/DashboardAdmin/Notificaciones" element={<Notificaciones />} />
      <Route path="/DashboardAdmin/Ayuda" element={<Ayuda />} />
    </Routes>
    </>
  )
}

export default App
