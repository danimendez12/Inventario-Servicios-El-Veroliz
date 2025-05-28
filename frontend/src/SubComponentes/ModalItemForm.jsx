import React, { useState } from 'react';
import '../estilos.css';
import '../estilos/ModalItemForm.css'
export default function ModalItemForm({ open, onClose, onSubmit, initialData, modo }) {
  const [form, setForm] = useState(initialData || {
    producto: '',
    categoria: '',
    hojas: '',
    cantidad: '',
    linea: '',
    minimo: ''
  });

  React.useEffect(() => {
    setForm(initialData || {
      producto: '',
      categoria: '',
      hojas: '',
      cantidad: '',
      linea: '',
      minimo: ''
    });
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-bg">
      <div className="modal-form-box">
        <h2 className="modal-title">Formulario producto</h2>
        <div className="modal-sub">Por favor llene todos los campos</div>
        <form onSubmit={handleSubmit}>
          <label>Nombre
            <input name="producto" value={form.producto} onChange={handleChange} placeholder="valor" required />
          </label>
          <label>Categoría
            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="">Valor</option>
              <option value="1">Portadas</option>
              <option value="2">Telas de encuadernacion</option>
              <option value="3">Libros Interior</option>
              <option value="4">Pegamentos</option>
              <option value="5">Tintas</option>
              <option value="6">Papeles</option>
              <option value="7">Consumibles</option>
              <option value="8">Insumos y Consumible</option>
              <option value="9">Libros Terminados</option>
            </select>
          </label>
          <label>Hojas
            <select name="hojas" value={form.hojas} onChange={handleChange} required>
              <option value="">Valor</option>
              <option value="1">50</option>
              <option value="2">100</option>
              <option value="3">200</option>
              <option value="4">300</option>
              <option value="5">400</option>
              <option value="6">500</option>
              <option value="7">1000</option>
            </select>
          </label>
          <label>Cantidad
            <input name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="valor" required />
          </label>
          <label>Línea
            <select name="linea" value={form.linea} onChange={handleChange} required>
              <option value="">Valor</option>
              <option value="1">Económica</option>
              <option value="3">Plus</option>
              <option value="2">Normal</option>
            </select>
          </label>
          <label>Mínimo en stock
            <input name="minimo" value={form.minimo} onChange={handleChange} placeholder="valor" required />
          </label>
          <div className='btn-botonesForm'>
                <button className="modal-btn" type="submit">{modo === 'modificar' ? 'Modificar' : 'Agregar'}</button>
                <button className="modal-btn-cancel" type="button" onClick={onClose}>Cancelar</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
