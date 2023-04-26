import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Input, Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Editor({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = async () => {
    const pdfDoc = await pdfjs.getDocument(file).promise;
    const page = await pdfDoc.getPage(1);
    const canvas = document.createElement('canvas');
    const viewport = page.getViewport({ scale: 1 });
    const canvasContext = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext, viewport }).promise;
    canvasContext.font = '16px Arial';
    canvasContext.fillText(text, 50, 50);
    const newFile = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    link.download = 'modified.pdf';
    link.href = newFile;
    link.click();
  };

  return (
    <div>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <Input value={text} onChange={handleTextChange} />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

export default Editor;
