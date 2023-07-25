import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PdfEditor() {
  // Use the useSelector hook to access the state from the Redux store
  const data = useSelector((state) => state.someReducer.data);
  const loading = useSelector((state) => state.someReducer.loading);
  const error = useSelector((state) => state.someReducer.error);

  // Use the data, loading, and error variables as needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);

  return (
    <div className="pdfEditor">
      <h1>Pdf Editor</h1>
      <p>Data: {JSON.stringify(data)}</p>
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
