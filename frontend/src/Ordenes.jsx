import React, { useState } from 'react'
import Header from './SubComponentes/Header'
import { useLocation } from 'react-router-dom'
import OrdenCard from './SubComponentes/OrdenCard'
import ModalOrden from './SubComponentes/ModalOrden'
import './estilos/ordenes.css';

export default function Ordenes() {
  const location = useLocation();
  const { ordenes: ordenesInit } = location.state || { ordenes: [] };
  const [ordenes, setOrdenes] = useState(ordenesInit);
  const [modalOrden, setModalOrden] = useState(null);

  // Eliminar orden
  const handleDelete = (orden) => {
    setOrdenes(prev => prev.filter(o => o.numero !== orden.numero));
    setModalOrden(null);
  };

  // Completar orden
  const handleCompletar = (orden) => {
    setOrdenes(prev => prev.map(o => o.numero === orden.numero ? { ...o, estado: 'Completada' } : o));
    setModalOrden({ ...orden, estado: 'Completada' });
  };

  return (
    <div className="ordenes-main-bg">
      <Header titulo={"Órdenes"}/>
      <div className="ordenes-contenedor">
        <h2 className="ordenes-titulo">Órdenes de compra</h2>
        <div className="ordenes-lista">
          {ordenes.map((orden) => (
            <OrdenCard
              key={orden.numero}
              numero={orden.numero}
              estado={orden.estado}
              entrega={orden.entrega}
              onDetalle={() => setModalOrden(orden)}
            />
          ))}
        </div>
      </div>
      <ModalOrden
        orden={modalOrden}
        onClose={() => setModalOrden(null)}
        onDelete={handleDelete}
        onCompletar={handleCompletar}
      />
    </div>
  )
}
