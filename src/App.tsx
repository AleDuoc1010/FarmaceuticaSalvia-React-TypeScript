import Home from "./pages/Home";
import Productos from "./pages/Productos";
import { Routes, Route, Link } from "react-router-dom";
import Ubicacion from "./pages/Ubicacion";
import Carrito from "./pages/Carrito";
import Historial from "./pages/Historial";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
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
                  <Link className="nav-link" to="/ubicacion">
                    Ubicación
                  </Link>                
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Carrito">
                    Carrito
                  </Link>                
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Historial">
                    Historial
                  </Link>                
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>                
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">
                    Register
                  </Link>
                </li>
              </ul> 
            </div>
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ubicacion" element={<Ubicacion />} />
            <Route path="/Carrito"   element={<Carrito />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />  
          </Routes>
        </div>
        <footer className="footer text-center py-3 bg-primary text-white">
          &copy; 2024 Farmaceutica. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default App


//Probando commits con bash