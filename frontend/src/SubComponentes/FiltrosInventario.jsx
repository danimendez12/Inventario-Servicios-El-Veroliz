import React from 'react';
import '../estilos/inventario.css';


export default function FiltrosInventario({ filtros, onFiltroChange }) {
  return (
    <div className="filtros-box">
      <h2 className="filtros-title">Filtros</h2>
    
      <select className="filtros-select" name="linea" onChange={onFiltroChange} value={filtros.linea || ''}>
        <option value="">Línea</option>
        <option value="Economica">Económica</option>
        <option value="Plus">Plus</option>
        <option value="Normal">Normal</option>
      </select>
      <select className="filtros-select" name="estado" onChange={onFiltroChange} value={filtros.estado || ''}>
        <option value="En stock">En stock</option>
        <option value="Bajo">Bajo</option>
        <option value="Vacío">Vacío</option>
      </select>
      <select className="filtros-select" name="hojas" onChange={onFiltroChange} value={filtros.hojas || ''}>
        <option value="">Hojas</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="250">250</option>
        <option value="500">500</option>
      </select>
      <button className="filtros-reset" onClick={() => onFiltroChange({ target: { name: 'reset', value: '' } })} title="Resetear filtros">
          <span role="img" aria-label="reset">🔄</span>
      </button>
    </div>
  );
}
