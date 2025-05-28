import React, { useState, useEffect } from 'react'
import Header from './SubComponentes/Header'
import { useLocation } from 'react-router-dom'
import { obtener_predicciones } from './api'
import './estilos/predicciones.css';

export default function Predicciones() {
    const location = useLocation();
    const { mes } = location.state || {};

    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargarPredicciones() {
            setCargando(true);
            const resultado = await obtener_predicciones();
            if (resultado.success) {
                setDatos(resultado.predicciones);
                setError('');
            } else {
                setError(resultado.message || 'Error al cargar predicciones');
            }
            setCargando(false);
        }
        cargarPredicciones();
    }, []);

    const columnas = [
        {key: 'sn', label : 'S/N'},
        {key: 'producto', label : 'Producto'},
        {key: 'stock_actual', label : 'Stock Actual'},
        {key: 'consumo_promedio', label : 'Consumo Promedio Mensual'},
        {key: 'stock_estimado', label : 'Stock Estimado para el mes'},
        {key: 'estado', label : 'Estado'},
        {key: 'recomendacion', label : 'Acción Recomendada'},
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
                            {cargando ? (
                                <tr><td colSpan={columnas.length}>Cargando...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={columnas.length}>{error}</td></tr>
                            ) : (!datos || datos.length === 0) ? (
                                <tr><td colSpan={columnas.length}>Sin resultados</td></tr>
                            ) : (
                                datos.map((dato, idx) => (
                                    <tr key={idx} style={{cursor:'pointer'}}>
                                        {columnas.map(col => (
                                            <td
                                                key={col.key}
                                                className={col.key === 'estado' ?
                                                    dato[col.key] === 'Suficiente' ? 'estado-en-stock' :
                                                    dato[col.key] === 'Bajo' ? 'estado-bajo' :
                                                    dato[col.key] === 'Critico' ? 'estado-vacio' :
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
