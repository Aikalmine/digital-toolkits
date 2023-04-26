import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Viewer({ pdfURL }) {
  const [numPages, setNumPages] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={pdfURL} onLoadSuccess={handleLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}

export default Viewer;
