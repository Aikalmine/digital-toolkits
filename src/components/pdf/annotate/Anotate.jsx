import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Annotate() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [textLayer, setTextLayer] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTextLayer(document.querySelector('.react-pdf__Page__textContent'));
  }

  function addText(event) {
    if (textLayer) {
      const { clientX, clientY } = event;
      const page = textLayer.closest('.react-pdf__Page');
      const pageRect = page.getBoundingClientRect();
      const x = clientX - pageRect.left;
      const y = clientY - pageRect.top;
      const span = document.createElement('span');
      span.style.position = 'absolute';
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      span.innerText = 'New Text';
      textLayer.appendChild(span);
    }
  }

  function savePdf() {
    if (file && textLayer) {
      const pdfDoc = new window.pdfjsLib.PDFDocument();
      const pdfPages = [];
      for (let i = 1; i <= numPages; i++) {
        const canvas = document.querySelector(`canvas.react-pdf__Page__canvas:nth-of-type(${i})`);
        const viewport = canvas.getClientRects()[0];
        const pdfPage = pdfDoc.addPage({ size: [viewport.width, viewport.height] });
        const canvasContext = canvas.getContext('2d');
        const imageData = canvasContext.getImageData(0, 0, viewport.width, viewport.height);
        pdfPage.drawText('New Text');
        pdfPage.drawImage(imageData, { x: 0, y: 0, width: viewport.width, height: viewport.height });
        pdfPages.push(pdfPage);
      }
      pdfDoc.addPage(pdfPages);
      pdfDoc.save('modified.pdf');
    }
  }

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {file && (
        <div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} onClick={addText} />
            ))}
          </Document>
          <button onClick={savePdf}>Save PDF</button>
        </div>
      )}
    </div>
  );
}

export default Annotate;
