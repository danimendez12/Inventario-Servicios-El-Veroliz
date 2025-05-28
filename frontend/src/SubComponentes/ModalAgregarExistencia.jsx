import React, { useState } from 'react';
import '../estilos.css';
import '../estilos/ModalItemForm.css'
export default function ModalItemForm({ open, onClose, onSubmit, modo }) {
  const [cantidad, setCantidad] = useState(0);
  if (!open) return null;

  const handleChange = e => {
    setCantidad(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(cantidad);
  };

  return (
    <div className="modal-bg">
      <div className="modal-form-box">
        <h2 className="modal-title">{modo === 'agregarExistencia' ? 'Agregar existencias' : 'Restar existencias'}</h2>
        <div className="modal-sub">{modo === 'agregarExistencia' ? 'Por favor agregue una cantidad válida' : 'Por favor reste una cantidad válida'}</div>
        <form onSubmit={handleSubmit}>
          <label>Cantidad
            <input name="producto"  onChange={handleChange} placeholder="valor" required />
          </label>
          <div className='btn-botonesForm'>
                <button className="modal-btn" type="submit">{modo === 'agregarExistencia' ? 'Sumar' : 'Restar'}</button>
                <button className="modal-btn-cancel" type="button" onClick={onClose}>Cancelar</button>
          </div>
       </form> 
        </div>
    </div>

    );
}