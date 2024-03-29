// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Notepad from "./components/notepad/Notepad.jsx";
import PdfEditor from "./components/pdf/PdfEditor.jsx";
import PdfRotation from "./components/pdf/PdfRotation.jsx";
import Annotate from "./components/pdf/annotate/Anotate.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Settings from "./components/settings/Settings.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="App">
            <header className="App-header">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/notepad">Notepad</Link>
                </li>
                <li>
                  <Link to="/pdf-editor">Pdf Editor</Link>
                </li>
              </ul>
            </header>
            <Routes>
              <Route path="/" />
              <Route path="/notepad" element={<Notepad />} />
              <Route path="/pdf-editor" element={<PdfEditor />} />
              <Route path="/pdf-rotate" element={<PdfRotation />} />
              <Route path="/pdf-annotate" element={<Annotate />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </Router>
      </DndProvider>
    </Provider>
  );
}

export default App;
