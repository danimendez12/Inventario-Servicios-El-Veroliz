import React, { useState } from 'react';
import './estilos.css';
import './estilos/reportes.css';
import Header from './SubComponentes/Header';
import jsPDF from 'jspdf';

export default function Reportes() {
  const [imagenes, setImagenes] = useState([
    // Imágenes grandes para probar el layout
    'https://dummyimage.com/1200x1500/ba2020/fff&text=Distribucion+de+ventas',
    'https://dummyimage.com/500x250/ba2020/fff&text=Tendencia+en+el+tiempo',
    'https://dummyimage.com/500x250/ba2020/fff&text=Ventas+por+categoria'
  ]);

  // con esto se hace el fetch con 

  const obtenerImagenes = async () => {
    useEffect(() => {
    fetch('Url')
    .then(res => res.json())
    .then(data => setImagenes(data.imagenes));
}, []);
  }

  const handleGenerarPDF = async () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    let y = 30;
    for (let i = 0; i < imagenes.length; i++) {
      const img = imagenes[i];
      // Cargar la imagen como base64
      const imgData = await fetch(img)
        .then(res => res.blob())
        .then(blob => new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        }));
      doc.addImage(imgData, 'PNG', 40, y, 320, 180);
      y += 200;
      if (i < imagenes.length - 1) doc.addPage();
    }
    doc.save('reporte.pdf');
  };

  return (
    <div className='contenedorReportesMain'>
      <Header titulo="Reportes"habilitado={true} textoBoton={'PDF'} onSubmit={handleGenerarPDF}/>
      <div className="reportes-grid">
        <div className="reportes-card reportes-card-pie">
          <img src={imagenes[0]} alt="Distribucion de ventas" className="reportes-img" />
          <div className="reportes-titulo">Distribucion de ventas</div>

        </div>
        <div className="reportes-card reportes-card-line">
          <img src={imagenes[1]} alt="Tendencia en el tiempo" className="reportes-img" />
          <div className="reportes-titulo">Tendencia en el tiempo</div>
        </div>
        <div className="reportes-card reportes-card-bar">
          <img src={imagenes[2]} alt="Ventas por categoria" className="reportes-img" />
          <div className="reportes-titulo">Ventas por categoria</div>
        </div>
      </div>
    </div>
  );
}
