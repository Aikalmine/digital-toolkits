import ReactQuill from 'react-quill';
import  { modules, formats, CustomUndo, CustomRedo, CustomPrint, CustomCut, CustomPaste, CustomCopy } from "./EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import { useLocalStorage } from '../common/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

//https://github.com/zenoamaro/react-quill
function Notepad() {

    const [notepad, setNotepad] = useLocalStorage('notepad', '');

    function handleChangeNotePad(e){
        setNotepad(e);
    }

    function handleClickClear(){
        setNotepad('');
    }

  return (
    <div className="notepad">
        <div id="toolbar">
            <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
                <option value="arial">Arial</option>
                <option value="comic-sans">Comic Sans</option>
                <option value="courier-new">Courier New</option>
                <option value="georgia">Georgia</option>
                <option value="helvetica">Helvetica</option>
                <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" defaultValue="medium">
                <option value="extra-small">Size 1</option>
                <option value="small">Size 2</option>
                <option value="medium">Size 3</option>
                <option value="large">Size 4</option>
            </select>
            <select className="ql-header" defaultValue="3">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="3">Normal</option>
            </select>
            </span>
            <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            </span>
            <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
            </span>
            <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
            </span>
            <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
            </span>
            <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
            </span>
            <span className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
                <button className="ql-print">
                    <CustomPrint />
                </button>
                <button className="ql-cut">
                    <CustomCut />
                </button>
                <button className="ql-copy">
                    <CustomCopy />
                </button>
                <button className="ql-paste">
                    <CustomPaste />
                </button>
                <button onClick={handleClickClear} className="ql-trash">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </span>
        </div>
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
