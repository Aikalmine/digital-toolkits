import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import { useLocalStorage } from '../common/useLocalStorage';

//https://github.com/zenoamaro/react-quill
function Notepad() {

    const [notepad, setNotepad] = useLocalStorage('notepad', '');
    function handleChangeNotePad(e){
        setNotepad(e.target.value);
    }

  return (
    <div className="notepad">
        <EditorToolbar />
        <div id="notepadText">
            <ReactQuill
                theme="snow"
                value={notepad}
                onChange={handleChangeNotePad}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />
        </div>
    </div>
  );
}

export default Notepad;