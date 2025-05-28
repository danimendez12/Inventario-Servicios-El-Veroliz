import React, { useState } from 'react';
import './estilos.css';
import { useNavigate } from 'react-router-dom';
import Header from './SubComponentes/Header';
import DashboardBox from './SubComponentes/DashboardBox';
import NotificacionesBar from './SubComponentes/NotificacionesBar';
import { useLocation } from 'react-router-dom';
export default function DashboardAdmin() {
  // Estado global de notificaciones para compartir con Notificaciones.jsx
  const datosNotificaciones = [
    {
      id: 1,
      titulo: 'Inventario Bajo: Papel Bond A4',
      descripcion: 'Quedan 50 unidades en stock. Nivel mínimo: 100 unidades',
      cuerpo: 'Hemos detectado niveles bajos de stock de papel bond A4. Por favor, considere realizar un pedido de reposición para evitar interrupciones en el suministro.',
      fecha: 'Hace 5 minutos',
      fechaCompleta: 'Abril 15, 2025 10:30 AM',
      leida: false,
    },
    {
      id: 2,
      titulo: 'Reporte Semanal Disponible',
      descripcion: 'El reporte de ventas de la semana 45 está listo para revisión',
      cuerpo: 'El reporte de ventas de la semana 45 está listo para revisión. Puede consultarlo en la sección de reportes.',
      fecha: 'Hace 1 hora',
      fechaCompleta: 'Abril 15, 2025 09:30 AM',
      leida: false,
    },
    {
      id: 3,
      titulo: 'Actualización de Inventario Completada',
      descripcion: 'La sincronización automática de inventario ha finalizado',
      cuerpo: 'La sincronización automática de inventario ha finalizado correctamente.',
      fecha: 'Hace 3 horas',
      fechaCompleta: 'Abril 15, 2025 07:30 AM',
      leida: true,
    },
    {
      id: 4,
      titulo: 'Producto Próximo a Vencer',
      descripcion: 'Lote #A789 vencerá en 15 días',
      cuerpo: 'El lote #A789 vencerá en 15 días. Por favor, revise el inventario y tome las acciones necesarias.',
      fecha: 'Hace 5 horas',
      fechaCompleta: 'Abril 15, 2025 05:30 AM',
      leida: false,
    },
    {
      id: 5,
      titulo: 'Pedido Recibido',
      descripcion: 'Orden #45789 ha sido registrada en el sistema',
      cuerpo: 'La orden #45789 ha sido registrada correctamente en el sistema.',
      fecha: 'Hace 1 día',
      fechaCompleta: 'Abril 14, 2025 10:30 AM',
      leida: true,
    }
    
  ];

  const datosPredicciones =[
  {
    sn: "01",
    producto: "Actas 500",
    stockActual: 300,
    consumoPromedioMensual: 200,
    stockEstimadoMes: 250,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "02",
    producto: "Actas 100",
    stockActual: 200,
    consumoPromedioMensual: 300,
    stockEstimadoMes: 250,
    estado: "Revisión",
    accionRecomendada: "Monitoreo/ Producción"
  },
  {
    sn: "03",
    producto: "Mayor 200",
    stockActual: 50,
    consumoPromedioMensual: 100,
    stockEstimadoMes: 100,
    estado: "Urgente",
    accionRecomendada: "Producción 70 Uds"
  },
  {
    sn: "04",
    producto: "Mayor 100",
    stockActual: 546,
    consumoPromedioMensual: 300,
    stockEstimadoMes: 300,
    estado: "Revisión",
    accionRecomendada: "Monitoreo/ Sobreabastecimiento"
  },
  {
    sn: "05",
    producto: "Actas 200",
    stockActual: 234,
    consumoPromedioMensual: 250,
    stockEstimadoMes: 200,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "06",
    producto: "Fichas 250",
    stockActual: 100,
    consumoPromedioMensual: 100,
    stockEstimadoMes: 100,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "07",
    producto: "Fichas 500",
    stockActual: 200,
    consumoPromedioMensual: 150,
    stockEstimadoMes: 175,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "08",
    producto: "Libreta laboratorio",
    stockActual: 150,
    consumoPromedioMensual: 100,
    stockEstimadoMes: 100,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "09",
    producto: "Libro costura",
    stockActual: 56,
    consumoPromedioMensual: 30,
    stockEstimadoMes: 30,
    estado: "Óptimo",
    accionRecomendada: "N/A"
  },
  {
    sn: "10",
    producto: "Fichas 100",
    stockActual: 400,
    consumoPromedioMensual: 300,
    stockEstimadoMes: 320,
    estado: "Revisión",
    accionRecomendada: "Monitoreo/ Sobreabastecimiento"
  }
  ];

  // Datos de ejemplo para órdenes
  const datosOrdenes = [
    { numero: 45707, estado: 'Atrasada', entrega: 'Entrega 19 de Abril' },
    { numero: 95467, estado: 'A tiempo', entrega: 'Entrega 15 de Abril' },
    { numero: 4423, estado: 'A tiempo', entrega: 'Entrega 15 de Abril' },
    { numero: 4456, estado: 'Sin revisar', entrega: 'Sin fecha' },
    { numero: 608, estado: 'Completada', entrega: 'Hace 1 día' },
  ];

  return (
    <div className='contenedorDashboard'>
      <Header titulo="Dashboard Inventario" />
      <div className="dashboard-main">
        <div className="dashboard-grid">
          <DashboardBox icon={
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 26.25C45 22.2718 43.4196 18.4564 40.6066 15.6434C37.7936 12.8304 33.9782 11.25 30 11.25H7.5V67.5H33.75C36.7337 67.5 39.5952 68.6853 41.705 70.795C43.8147 72.9048 45 75.7663 45 78.75M45 26.25V78.75M45 26.25C45 22.2718 46.5804 18.4564 49.3934 15.6434C52.2064 12.8304 56.0218 11.25 60 11.25H82.5V67.5H56.25C53.2663 67.5 50.4048 68.6853 48.295 70.795C46.1853 72.9048 45 75.7663 45 78.75" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          }label="Inventario" />
          <DashboardBox icon={
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 15H67.5C69.4891 15 71.3968 15.7902 72.8033 17.1967C74.2098 18.6032 75 20.5109 75 22.5V75C75 76.9891 74.2098 78.8968 72.8033 80.3033C71.3968 81.7098 69.4891 82.5 67.5 82.5H22.5C20.5109 82.5 18.6032 81.7098 17.1967 80.3033C15.7902 78.8968 15 76.9891 15 75V22.5C15 20.5109 15.7902 18.6032 17.1967 17.1967C18.6032 15.7902 20.5109 15 22.5 15H30M33.75 7.5H56.25C58.3211 7.5 60 9.17893 60 11.25V18.75C60 20.8211 58.3211 22.5 56.25 22.5H33.75C31.6789 22.5 30 20.8211 30 18.75V11.25C30 9.17893 31.6789 7.5 33.75 7.5Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } label="Reportes" />
          <DashboardBox  icon={
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M86.25 22.5L50.625 58.125L31.875 39.375L3.75 67.5M86.25 22.5H63.75M86.25 22.5V45" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
          } label="Predicciones" extraState={{ mes: 'Junio', datos: datosPredicciones}} />
          <DashboardBox icon={
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 3.75H18.75L28.8 53.9625C29.1429 55.689 30.0822 57.2398 31.4533 58.3436C32.8244 59.4474 34.5401 60.0337 36.3 60H72.75C74.5099 60.0337 76.2256 59.4474 77.5967 58.3436C78.9678 57.2398 79.9071 55.689 80.25 53.9625L86.25 22.5H22.5M37.5 78.75C37.5 80.8211 35.8211 82.5 33.75 82.5C31.6789 82.5 30 80.8211 30 78.75C30 76.6789 31.6789 75 33.75 75C35.8211 75 37.5 76.6789 37.5 78.75ZM78.75 78.75C78.75 80.8211 77.0711 82.5 75 82.5C72.9289 82.5 71.25 80.8211 71.25 78.75C71.25 76.6789 72.9289 75 75 75C77.0711 75 78.75 76.6789 78.75 78.75Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } label="Ordenes" extraState={{ ordenes: datosOrdenes }} />
          <DashboardBox icon={
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 3.75H18.75L28.8 53.9625C29.1429 55.689 30.0822 57.2398 31.4533 58.3436C32.8244 59.4474 34.5401 60.0337 36.3 60H72.75C74.5099 60.0337 76.2256 59.4474 77.5967 58.3436C78.9678 57.2398 79.9071 55.689 80.25 53.9625L86.25 22.5H22.5M37.5 78.75C37.5 80.8211 35.8211 82.5 33.75 82.5C31.6789 82.5 30 80.8211 30 78.75C30 76.6789 31.6789 75 33.75 75C35.8211 75 37.5 76.6789 37.5 78.75ZM78.75 78.75C78.75 80.8211 77.0711 82.5 75 82.5C72.9289 82.5 71.25 80.8211 71.25 78.75C71.25 76.6789 72.9289 75 75 75C77.0711 75 78.75 76.6789 78.75 78.75Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } label="Ayuda" />
        </div>
        {/* NotificacionesBar recibe las notificaciones dinámicas */}
        <NotificacionesBar extraState={{notificaciones: datosNotificaciones}}/>
      </div>
    </div>
  );
}
