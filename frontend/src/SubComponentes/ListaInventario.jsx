import React from 'react';
import '../estilos/inventario.css';

export default function ListaInventario({ items, busqueda, onBusqueda, columnas, onRowClick, selectedIdx }) {
  return (
    <div className="lista-box2 inventario-lista-box2">
      <input
              className="lista-busqueda"
              placeholder="Buscar item..."
              value={busqueda}
              onChange={e => onBusqueda(e.target.value)}
              maxLength={50}
            />
      <div className='scrolleable2'>
            
            <table className="lista-table2">
              <thead>
                <tr>
                  {columnas.map(col => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={columnas.length} style={{textAlign:'center'}}>Sin resultados</td></tr>
                ) : (
                  items.map((item, idx) => (
                    <tr
                      key={idx}
                      className={selectedIdx === idx ? 'lista-row-selected' : ''}
                      onClick={() => onRowClick(idx)}
                      style={{cursor:'pointer'}}
                    >
                      {columnas.map(col => (
                        <td
                          key={col.key}
                          className={col.key === 'estado' ?
                            item[col.key] === 'En stock' ? 'estado-en-stock' :
                            item[col.key] === 'Bajo' ? 'estado-bajo' :
                            item[col.key] === 'Vacío' ? 'estado-vacio' : ''
                            : ''}
                        >
                          {item[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

    </div>
    
    
  );
}
