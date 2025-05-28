import React, { useState, useEffect } from 'react'
import Header from './SubComponentes/Header'
import { useLocation } from 'react-router-dom'
import OrdenCard from './SubComponentes/OrdenCard'
import ModalOrden from './SubComponentes/ModalOrden'
import './estilos/ordenes.css';
import { obtener_ordenes, completar_orden } from './api'

export default function Ordenes() {
  const location = useLocation();
  const { ordenes: ordenesInit } = location.state || { ordenes: [] };
  const [ordenes, setOrdenes] = useState(ordenesInit);
  const [modalOrden, setModalOrden] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarOrdenes() {
      setCargando(true);
      const resultado = await obtener_ordenes();
      if (resultado.success) {
        console.log('Órdenes cargadas:', resultado.ordenes);
        console.log(resultado.ordenes);
        setOrdenes(resultado.ordenes);
        setError('');
      } else {
        setError(resultado.message || 'Error al cargar órdenes');
      }
      setCargando(false);
    }
    cargarOrdenes();
  }, []);

  // Eliminar orden
  const handleDelete = (orden) => {
    setOrdenes(prev => prev.filter(o => o.numero !== orden.numero));
    setModalOrden(null);
  };

  // Completar orden
  const handleCompletar = async (orden) => {
    console.log('Completando orden:', orden);
    const id = orden.numero_orden || orden.numero;
    if (!id) return;
    const resultado = await completar_orden(id);
    if (resultado.success) {
      setOrdenes(prev => prev.map(o => (o.numero_orden === id || o.numero === id) ? { ...o, estado: 'Completo' } : o));
      setModalOrden({ ...orden, estado: 'Completo' });
    } else {
      alert(resultado.message || 'Error al completar la orden');
    }
  };

  return (
    <div className="ordenes-main-bg">
      <Header titulo={"Órdenes"}/>
      <div className="ordenes-contenedor">
        <h2 className="ordenes-titulo">Órdenes de compra</h2>
        <div className="ordenes-lista">
          {cargando ? (
            <div style={{padding: '2em', textAlign: 'center'}}>Cargando...</div>
          ) : error ? (
            <div style={{padding: '2em', color: 'red', textAlign: 'center'}}>{error}</div>
          ) : ordenes.length === 0 ? (
            <div style={{padding: '2em', textAlign: 'center'}}>Sin resultados</div>
          ) : (
            ordenes.map((orden) => (
              <OrdenCard
                key={orden.numero || orden.numero_orden}
                numero={orden.numero || orden.numero_orden}
                estado={orden.estado}
                entrega={orden.entrega || orden.decha_entrega}
                onDetalle={() => setModalOrden(orden)}
              />
            ))
          )}
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
