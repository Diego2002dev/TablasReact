import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist';

const Print = () => {

  const printPDF = async () => {
    // Crear el PDF con pdf-lib
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 400]);
    page.drawText('Este es un PDF generado con pdf-lib en React', {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0)
    });

    // Convertir el PDF a un Blob
    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobURL = URL.createObjectURL(blob);

    // Abrir el PDF en una nueva pestaña
    const newWindow = window.open(blobURL);
    
    if (newWindow) {
      // Usar pdfjs-dist para cargar y mostrar el PDF en la nueva ventana
      const pdfViewerContainer = newWindow.document.createElement('div');
      newWindow.document.body.appendChild(pdfViewerContainer);
      
      const loadingTask = getDocument(blobURL);
      loadingTask.promise.then(pdf => {
        pdf.getPage(1).then(page => {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = newWindow.document.createElement('canvas');
          pdfViewerContainer.appendChild(canvas);
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          
          page.render(renderContext).promise.then(() => {
            newWindow.print();
          });
        });
      });
    }
  };

  return (
    <div>
      <h1>Imprimir PDF directamente en React</h1>
      <button onClick={printPDF}>Imprimir PDF</button>
    </div>
  );
};

export default Print;
