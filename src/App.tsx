import Home from "./pages/Home";
import Productos from "./pages/Productos";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top w-100 shadow">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              Farmaceutica
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                          <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/"> Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">
                  Productos
                </Link>                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            </ul> 
            </div>
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>

        <footer className="footer text-center py-3 bg-primary text-white">
            &copy; 2024 Farmaceutica. All rights reserved.
        </footer>
      </div>
  )
}

export default App
