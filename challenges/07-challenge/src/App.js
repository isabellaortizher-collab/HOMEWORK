import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Canciones from "./Canciones";
import Historial from "./Historial";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/canciones">Canciones</Link>
          <Link to="/historial">Historial</Link>
        </nav>
        <Routes>
          <Route path="/canciones" element={<Canciones />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

