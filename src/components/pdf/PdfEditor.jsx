import React from 'react';
import { Link } from 'react-router-dom';

function PdfEditor() {

  
  
  return (
    <div className="pdfEditor">
      <h1>Pdf Editor</h1>
      <div>
        <ul>
          <li>
            <Link to="/pdf-rotate">Pdf Rotate</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PdfEditor;