import React from 'react'
import Header from './SubComponentes/Header'
import { useLocation } from 'react-router-dom'
import './estilos/predicciones.css';

export default function Predicciones() {
    const location = useLocation();
    const { mes, datos } = location.state || {};

    const columnas = [
        {key: 'sn', label : 'S/N'},
        {key: 'producto', label : 'Producto'},
        {key: 'stockActual', label : 'Stock Actual'},
        {key: 'consumoPromedioMensual', label : 'Consumo Promedio Mensual'},
        {key: 'stockEstimadoMes', label : 'Stock Estimado para el mes'},
        {key: 'estado', label : 'Estado'},
        {key: 'accionRecomendada', label : 'Acción Recomendada'},
    ];

    return (
        <div> 
                <Header titulo={"Predicciones"} />
                 <div className='contenedorPredicciones'> 
            <div className='lista-box'>
                { mes != null && (
                        <h2 style={{marginBottom: '24px'}}>Prediccion mes de {mes}</h2>
                )}
                <div className='scrolleable'>
                    <table className="lista-table">
                        <thead style={{position: 'sticky', top: 0, background: '#fff', zIndex: 2}}>
                            <tr>
                                {columnas.map(col => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(!datos || datos.length === 0) ? (
                                <tr><td colSpan={columnas.length}>Sin resultados</td></tr>
                            ) : (
                                datos.map((dato, idx) => (
                                    <tr key={idx} style={{cursor:'pointer'}}>
                                        {columnas.map(col => (
                                            <td
                                                key={col.key}
                                                className={col.key === 'estado' ?
                                                    dato[col.key] === 'Óptimo' ? 'estado-en-stock' :
                                                    dato[col.key] === 'Revisión' ? 'estado-bajo' :
                                                    dato[col.key] === 'Urgente' ? 'estado-vacio' :
                                                    '' : ''}
                                            >
                                                {dato[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </div>
       
    )
}
