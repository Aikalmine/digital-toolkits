import React, { useState, useEffect } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function PdfRotation() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [rotation, setRotation] = useState(0);

  const handleClear = () => {
    setPdfDoc(null);
    setPdfFile(null);
    setImageUrl(null);
    setRotation(0);
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const loadedPdf = await PDFDocument.load(await file.arrayBuffer());
    setPdfDoc(loadedPdf);
    setPdfFile(file);
    setFileName(file.name.slice(0, file.name.lastIndexOf(".")));
  };

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsDataURL(file);
        });
};

  const convertPdfToImage = async () => {
    if (!pdfFile) return; // Return if pdfFile is not set yet
    const data = await readFileData(pdfFile);
    const pdf = await pdfjsLib.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    let height = 0;
    let width = 0;
    
    for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        height += viewport.height;
        width = Math.max(width, viewport.width);
    }
    
    canvas.width = width;
    canvas.height = height;
    let yOffset = 0;

    for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext("2d");
        context.translate(0, yOffset);
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;
        yOffset += viewport.height;
    }
    
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);
    canvas.remove();
};


  const handleRotateClick = async () => {
    const newRotation = rotation + 90;
    setRotation(newRotation);
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + 90));
    });
    convertPdfToImage(pdfFile);
  };

  const handleDownloadClick = async () => {
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}_rotated.pdf`;
    link.click();
  };

  useEffect(() => {
    if (pdfFile) {
        convertPdfToImage();
    }
  });

  return (
    <div className="pdfEditor">
      <h1>Pdf Rotation</h1>
      <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleRotateClick}>Rotate 90 degrees</button>
        <button onClick={handleDownloadClick}>Download</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          width={500}
          height={500}
          alt="PDF file"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      )}
    </div>
  );
}

export default PdfRotation;