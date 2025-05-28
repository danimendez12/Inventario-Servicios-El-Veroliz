import React, { useState, useMemo, useEffect } from 'react';
import Header from './SubComponentes/Header';
import FiltrosInventario from './SubComponentes/FiltrosInventario';
import ListaInventario from './SubComponentes/ListaInventario';
import AccionesInventario from './SubComponentes/AccionesInventario';
import './estilos/inventario.css';
import ModalItemForm from './SubComponentes/ModalItemForm';
import ModalEliminar from './SubComponentes/ModalEliminar';
import ModalConfirmacion from './SubComponentes/ModalConfirmacion';
import ModalAgregarExistencia from './SubComponentes/ModalAgregarExistencia';
import { obtener_inventario } from './api';

const COLUMNAS = [
  { key: 'id', label: 'ID' },
  { key: 'producto', label: 'Producto' },
  { key: 'hojas', label: 'Hojas' },
  { key: 'linea', label: 'Línea' },
  { key: 'cantidad', label: 'Cantidad' },
  { key: 'estado', label: 'Estado' },
];
export default function Inventario() {
  const [filtros, setFiltros] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0); // Nuevo: índice seleccionado
  const [modalOpen, setModalOpen] = useState(false);
  const [modalModo, setModalModo] = useState('agregar'); // 'agregar' o 'modificar'
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalAgregarExistenciaOpen, setModalAgregarExistenciaOpen] = useState(false);
  const [modalRestarExistenciaOpen, setModalRestarExistenciaOpen] = useState(false);
  const [modalExistenciaModo, setModalExistenciaModo] = useState('agregarExistencia'); // 'agregarExistencia' o 'restarExistencia'
  const [dataInventario, setDataInventario] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      const resultado = await obtener_inventario();
      if (resultado.success) {
        setDataInventario(resultado.inventario);
        setError('');
      } else {
        setError(resultado.message || 'Error al cargar inventario');
      }
      setCargando(false);
    }
    cargarDatos();
  }, []);

  const items = useMemo(() => {
    return dataInventario.filter(item => {
      if (filtros.linea && item.linea !== filtros.linea) return false;
      if (filtros.estado && item.estado !== filtros.estado) return false;
      if (filtros.hojas && item.hojas !== filtros.hojas) return false;
      if (busqueda) {
        const texto = Object.values(item).join(' ').toLowerCase();
        if (!texto.includes(busqueda.toLowerCase())) return false;
      }
      return true;
    });
  }, [dataInventario, filtros, busqueda]);

  const handleFiltroChange = e => {
    if (e.target.name === 'reset') {
      setFiltros({});
      return;
    }
    setFiltros(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRowClick = idx => {
    setSelectedIdx(idx);
  };

  // Handlers para abrir el modal
  const handleAgregar = () => {
    setModalModo('agregar');
    setModalOpen(true);
  };
  const handleModificar = () => {
    setModalModo('modificar');
    setModalOpen(true);
  };

  // Handler para abrir el modal de eliminar
  const handleEliminar = () => {
    setModalEliminarOpen(true);
    setModalModo('eliminar');
  };

  const handleAgregarExistencia = () => {
    setModalAgregarExistenciaOpen(true);
    setModalExistenciaModo('agregarExistencia');
  }

  const handleRestarExistencia = () => {
    setModalAgregarExistenciaOpen(true);
    setModalExistenciaModo('restarExistencia');
  }
  // Handler para confirmar eliminación
  const handleEliminarItem = () => {
    setModalConfirmOpen(true);
    const itemAEliminar = items[selectedIdx] || items[0] || {};
    console.log('Item a eliminar:', itemAEliminar);
    setModalEliminarOpen(false);
    // Aquí puedes agregar la lógica real de eliminación
  };

  
  const handleModalExistenciasSubmit = (cantidad) => {
    setModalAgregarExistenciaOpen(false);
    setModalConfirmOpen(true);
    console.log('Cantidad de existencias:', cantidad); // Imprime la cantidad en consola
  }

  // Handler para submit del modal (aquí se agrega nuestra lógica real)
  const handleModalSubmit = (formData) => {
    setModalConfirmOpen(true);
    console.log('Valores del formulario:', formData); // Imprime los valores en consola
    setModalOpen(false);
  };

  const botones = [
    { label: 'Agregar Item', icon: 
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="#2C2C2C"/>
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#2C2C2C" stroke-linecap="round"/>
    <path d="M22 16.1666V27.8333M16.1667 22H27.8334" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
        , onClick: handleAgregar, isDisabled: false },
    { label: 'Eliminar Item', icon: 
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="#2C2C2C"/>
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#2C2C2C" stroke-linecap="round"/>
    <path d="M14.5 17H16.1667M16.1667 17H29.5M16.1667 17L16.1667 28.6666C16.1667 29.1087 16.3423 29.5326 16.6548 29.8451C16.9674 30.1577 17.3913 30.3333 17.8333 30.3333H26.1667C26.6087 30.3333 27.0326 30.1577 27.3452 29.8451C27.6577 29.5326 27.8333 29.1087 27.8333 28.6666V17M18.6667 17V15.3333C18.6667 14.8913 18.8423 14.4673 19.1548 14.1548C19.4674 13.8422 19.8913 13.6666 20.3333 13.6666H23.6667C24.1087 13.6666 24.5326 13.8422 24.8452 14.1548C25.1577 14.4673 25.3333 14.8913 25.3333 15.3333V17M20.3333 21.1666V26.1666M23.6667 21.1666V26.1666" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    , onClick: handleEliminar, isDisabled: false },
    { label: 'Modificar Item', icon: 
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="#2C2C2C"/>
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#2C2C2C" stroke-linecap="round"/>
    <g clip-path="url(#clip0_64_1046)">
    <path d="M21.1667 15.3333H15.3334C14.8913 15.3333 14.4674 15.5089 14.1548 15.8215C13.8423 16.134 13.6667 16.558 13.6667 17V28.6667C13.6667 29.1087 13.8423 29.5326 14.1548 29.8452C14.4674 30.1577 14.8913 30.3333 15.3334 30.3333H27C27.442 30.3333 27.866 30.1577 28.1785 29.8452C28.4911 29.5326 28.6667 29.1087 28.6667 28.6667V22.8333M27.4167 14.0833C27.7482 13.7518 28.1978 13.5656 28.6667 13.5656C29.1355 13.5656 29.5852 13.7518 29.9167 14.0833C30.2482 14.4148 30.4345 14.8645 30.4345 15.3333C30.4345 15.8022 30.2482 16.2518 29.9167 16.5833L22 24.5L18.6667 25.3333L19.5 22L27.4167 14.0833Z" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_64_1046">
    <rect width="20" height="20" fill="white" transform="translate(12 12)"/>
    </clipPath>
    </defs>
    </svg>
    , onClick: handleModificar, isDisabled: false },
    { label: 'Agregar Existencias', icon:
     <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="#2C2C2C"/>
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#2C2C2C" stroke-linecap="round"/>
    <path d="M22 27.8333V16.1666M22 16.1666L16.1667 22M22 16.1666L27.8334 22" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    , onClick: handleAgregarExistencia, isDisabled: false },
    { label: 'Restar Existencias', icon:
     <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" fill="#2C2C2C"/>
    <path d="M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z" stroke="#2C2C2C" stroke-linecap="round"/>
    <path d="M22 16.1667V27.8334M22 27.8334L27.8334 22.0001M22 27.8334L16.1667 22.0001" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    , onClick: handleRestarExistencia, isDisabled: false }
  ];

  // Producto seleccionado
  const selectedItem = items[selectedIdx] || items[0] || {}; //es el item que se está mostrando

  return (
    <div className="inventario-bg">
 
      <Header titulo="Inventario" />
      <div className="inventario-layout">
        <div className="inventario-col filtros-col">
          <FiltrosInventario filtros={filtros} onFiltroChange={handleFiltroChange} />
        </div>
        <div className="inventario-col tabla-col">
          <ListaInventario
            items={items}
            busqueda={busqueda}
            onBusqueda={setBusqueda}
            columnas={COLUMNAS}
            onRowClick={handleRowClick}
            selectedIdx={selectedIdx}
          />
        </div>
        <div className="acciones-col">
          <div className="acciones-panel">
            <div className="acciones-info">
              <div>Item: <span className="acciones-info-bold">{selectedItem.producto || '-'}</span></div>
              <div>Línea: <span className="acciones-info-bold acciones-info-eco">{selectedItem.linea || '-'}</span></div>
              <div>Cantidad en Stock: <span className="acciones-info-bold acciones-info-stock">{selectedItem.cantidad || '-'}</span></div>
            </div>
            <AccionesInventario botones={botones} />
          </div>
        </div>
      </div>
      <ModalItemForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={modalModo === 'modificar' ? selectedItem : null}
        modo={modalModo}
      />
      <ModalEliminar
        open={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        onConfirm={handleEliminarItem}
        item={selectedItem}
      />

      <ModalConfirmacion
        open={modalConfirmOpen}
        onClose={() => setModalConfirmOpen(false)}
        modo={modalModo}
      />

      <ModalAgregarExistencia
        open={modalAgregarExistenciaOpen}
        onClose={() => setModalAgregarExistenciaOpen(false)}
        onSubmit={handleModalExistenciasSubmit}
        modo={modalExistenciaModo}
    
      />
    </div>
  );
}
