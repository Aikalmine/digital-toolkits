// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Notepad from './components/notepad/Notepad.jsx';
import PdfEditor from './components/pdf/PdfEditor.jsx';

function App() {
  return (
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
            <Route path="/"/>
            <Route path="/notepad" element={<Notepad/>} />
            <Route path="/pdf-editor" element={<PdfEditor/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
