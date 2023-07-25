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
          <li>
            <Link to="/pdf-annotate">Pdf Annotate</Link>
          </li>
          <li>
            <Link to="/e2j">E2J Editor</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PdfEditor;