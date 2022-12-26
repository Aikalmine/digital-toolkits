import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import ReactToPrint from 'react-to-print';

//https://github.com/zenoamaro/react-quill
function Notepad() {

    const [state, setState] = useState({ value: '' });
    const handleChange = (value: any) => {
      setState({ value });
    };

  return (
    <div className="notepad">
        <EditorToolbar />
        <div id="notepadText">
            <ReactQuill
                theme="snow"
                value={state.value}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />
        </div>
    </div>
  );
}

export default Notepad;
