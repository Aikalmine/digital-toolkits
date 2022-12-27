// import './App.css';
import Notepad from './components/notepad/Notepad.jsx';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

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
            </ul>
        </header>
        <Routes>
            <Route path="/"/>
            <Route path="/notepad" element={<Notepad/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
