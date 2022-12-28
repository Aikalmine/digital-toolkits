import { Quill } from "react-quill";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { faScissors } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { getStorageValue, useLocalStorage } from '../common/useLocalStorage';

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
export const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
export const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// print button icon component for Quill editor
export const CustomPrint = () => (
<svg width="16" height="16" fill="currentColor" className="bi bi-printer" viewBox="0 0 18 18"> 
  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/> 
  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
 </svg>
);

// cut button icon component for Quill editor
export const CustomCut = () => (
  <FontAwesomeIcon icon={faScissors} />
);

// clear text area
const ClearTextArea = () => (
  <FontAwesomeIcon icon={faTrash} />
);

function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '');
}

let copyText = getStorageValue('notepad');
copyText = stripHtml(copyText);
// copy button icon component for Quill editor
export const CustomCopy = () => (
  
  <div>
     <CopyToClipboard text={copyText}
      onCopy={() => this.setState({copied: true})}>
      <button><FontAwesomeIcon icon={faCopy} /></button>
    </CopyToClipboard>
  </div>
 
);

// paste button icon component for Quill editor
export const CustomPaste = () => (
  <FontAwesomeIcon icon={faPaste} />
);


// Undo and redo functions for Custom Toolbar
function handleUndoChange() {
  this.quill.history.undo();
}
function handleRedoChange() {
  this.quill.history.redo();
}

function handlePrintChange(){
  //console.log('print'); 
  let notepadText = document.getElementById('notepadText');
  if (notepadText !== null){
    let printContents = notepadText.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
  } 
}

function handleCutChange(){

}




function handlePasteChange(){

}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: handleUndoChange,
      redo: handleRedoChange,
      print:handlePrintChange,
      cut:handleCutChange,
      paste:handlePasteChange
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];