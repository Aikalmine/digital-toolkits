import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';

function PdfRotation() {

  const [pdfDoc, setPdfDoc] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const loadedPdf = await PDFDocument.load(await file.arrayBuffer());
    setPdfDoc(loadedPdf);
  };

  const handleRotateClick = () => {
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const rotation = page.getRotation().angle;
      page.setRotation(degrees(rotation + 90));
    });
    setPdfDoc(pdfDoc);
  };

  const handleDownloadClick = async () => {
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rotated_file.pdf';
    link.click();
  };

  
  return (
    <div className="pdfEditor">
      <h1>Pdf Rotation</h1>
      <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleRotateClick}>Rotate 90 degrees</button>
        <button onClick={handleDownloadClick}>Download</button>
      </div>
    </div>
  );
}

export default PdfRotation;