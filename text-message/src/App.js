import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Entrance } from './components/Entrance';
import { Register } from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Entrance/>} />
          <Route path="/entrance" element={<Entrance/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;