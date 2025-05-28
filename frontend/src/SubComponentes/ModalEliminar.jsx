import React from 'react';
import '../estilos/ModalEliminar.css';

export default function ModalEliminar({ open, onClose, onConfirm, item }) {
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal-form-box modal-eliminar-box">
        <div className="modal-eliminar-icon">
            <svg width="75" height="75"  viewBox="0 0 69 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.5 22.875V33.0417M34.5 43.2084H34.5287M29.5837 9.81087L5.23247 45.75C4.7304 46.5187 4.46475 47.3902 4.46194 48.2778C4.45913 49.1654 4.71925 50.0382 5.21644 50.8093C5.71363 51.5804 6.43055 52.223 7.29588 52.6732C8.1612 53.1233 9.14477 53.3653 10.1487 53.375H58.8512C59.8552 53.3653 60.8387 53.1233 61.7041 52.6732C62.5694 52.223 63.2863 51.5804 63.7835 50.8093C64.2807 50.0382 64.5408 49.1654 64.538 48.2778C64.5352 47.3902 64.2695 46.5187 63.7675 45.75L39.4162 9.81087C38.9037 9.06389 38.182 8.44629 37.3209 8.01768C36.4598 7.58906 35.4882 7.36389 34.5 7.36389C33.5117 7.36389 32.5402 7.58906 31.679 8.01768C30.8179 8.44629 30.0962 9.06389 29.5837 9.81087Z" stroke="#FF0202" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h2 className="modal-eliminar-title">Cuidado</h2>
        <div className="modal-eliminar-desc">
          Seguro de eliminar este producto?
          <div className="modal-eliminar-producto">{item?.producto || '-'}</div>
        </div>
        <div className="modal-eliminar-btns">
          <button className="modal-btn"  onClick={onConfirm}>Confirmar</button>
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
