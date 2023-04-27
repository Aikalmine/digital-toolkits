import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import DraggableTextField from './DraggableTextField';
import { PDFDocument } from 'pdf-lib';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Anotate() {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [textFields, setTextFields] = useState([]);

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer({ maxSize: 50 * 1024 * 1024 }); // Increase the max buffer size to 50 MB
    setPdfBytes(new Uint8Array(data));
    setPdfUrl(URL.createObjectURL(file));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleClickClear = () => {
    setPdfBytes(null);
    setPdfUrl('');
    setTextFields([]);
  };

  const handleAddTextField = () => {
    setTextFields([...textFields, { top: 100, left: 100 }]);
  };

  const handleSaveClick = () => {
    handleDownloadClick();
  };

  const handleCancelClick = () => {
    handleClickClear();
  };

  const handleDownloadClick = async () => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont('Helvetica');
    for (let i = 0; i < textFields.length; i++) {
      const textField = textFields[i];
      const page = pages[textField.page - 1];
      const { width, height } = page.getSize();
      const text = textField.text;
      const fontSize = textField.fontSize || 12;
      const x = (textField.left / 100) * width;
      const y = height - (textField.top / 100) * height - fontSize;
      const contentStream = page
        .getOperatorList()
        .then((operatorList) => {
          pdfDoc.createContentStream(
            [
              ...operatorList,
              ...font.encodeText(text),
              'Tf',
              `${fontSize} Tf`,
              `${x} ${y} Td`,
              'T*',
            ],
            { resources: page.getResources() }
          );
        });
      page.addContentStreams(contentStream);
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'annotated.pdf';
    link.click();
  };


  return (
    <>
      <div className="row justify-content-center" id="pdfeditor">
        {!pdfBytes ? (
          <div className="col-md-12 d-flex justify-content-center">
            <div className="row justify-content-center">
              <input
                type="file"
                title="Select PDF File"
                accept="application/pdf"
                onChange={(e) => onFileChange(e)}
              />
            </div>
          </div>
        ) : null}
        {pdfBytes && (
          <div style={{ width: 600 }}>
            <button className="btn btn-warning" onClick={handleDownloadClick}>
              Download
            </button>
            <button className="btn btn-warning" onClick={handleClickClear}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleAddTextField}>
              Add Text Field
            </button>
            <br />
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              width={600}
              height={800}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  onRenderError={(error) => console.error(error)}
                  width={600}
                  height={800}
                >
                  {textFields.map((textField, i) => (
                    <DraggableTextField
                      key={i}
                      top={textField.top}
                      left={textField.left}
                      onSave={handleSaveClick}
                      onCancel={handleCancelClick}
                    />
                  ))}
                </Page>
              ))}
            </Document>
          </div>
        )}
      </div>
    </>
  );
}

export default Anotate;
