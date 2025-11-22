import { useState, useEffect } from "react";
import AdminUsuarios from "./pages/AdminUsuarios";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Ubicacion from "./pages/Ubicacion";
import Carrito from "./pages/Carrito";
import Historial from "./pages/Historial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SobreNosotros from "./pages/SobreNosotros";
import { sesionActiva, Logout } from "./scripts/forms";
import { esAdministrador } from "./scripts/admin";

function App() {

  const [isLogueado, setIsLogueado] = useState(sesionActiva());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const activa = sesionActiva();
    setIsLogueado(activa);

    if (activa){
      setIsAdmin(esAdministrador());
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  const handleLogout = () => {
    Logout();
    setIsLogueado(false);
    setIsAdmin(false);
    setIsNavCollapsed(true);
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg mi-navbar">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/" onClick={closeNav}>
              <img src="/logo_farmacia.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
            </Link>

            <button 
                className="navbar-toggler" 
                type="button" 
                onClick={handleNavCollapse}
                aria-controls="navbarTogglerDemo02" 
                aria-expanded={!isNavCollapsed} 
                aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`navbar-collapse collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={closeNav}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/productos" onClick={closeNav}>
                    Productos
                  </Link>                
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/ubicacion" onClick={closeNav}>
                    Ubicación
                  </Link>                
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/SobreNosotros" onClick={closeNav}>
                    Nosotros
                  </Link>                
                </li>

                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-danger" to="/usuarios" onClick={closeNav}>
                      Panel Usuarios
                    </Link>
                  </li>
                )}

                {isLogueado && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/Carrito" onClick={closeNav}>
                        Carrito
                      </Link>                
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/Historial" onClick={closeNav}>
                        Historial
                      </Link>                
                    </li>
                  </>
                )}

                {!isLogueado && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/Login" onClick={closeNav}>
                        Login
                      </Link>                
                    </li>
                  </>
                )}
              </ul>

              <div className="d-flex align-items-center gap-2">
                {isLogueado &&(
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                )}

                <form className="d-flex ms-2">
                  <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
              
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
            <Route path="/SobreNosotros" element={<SobreNosotros/>} />
            <Route path="/usuarios" element={<AdminUsuarios/>} />
          </Routes>
        </div>

        <footer className="footer-salvia text-light pt-5">
          <div className="container">
            <div className="row">

              
              <div className="col-md-3 mb-4">
                <h5>App Salvia</h5>
                <hr />
                <div className="d-flex flex-column gap-0">
                  <Link to="/"><img src="/App_Store_(iOS)-Badge-Logo.wine.svg" alt="App store" width="200" /></Link>
                  <Link to="/"><img src="/pngtree-google-play-app-icon-vector-png-image_9183316.png" alt="Google play" width="200"/></Link>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <h5>Salvia Empresa</h5>
                <hr />
                <ul className="list-unstyled">
                  <li>Quienes Somos</li>
                  <li>Transparencia</li>
                  <li>Prensa</li>
                  <li>Trabaja con Nosotros</li>
                </ul>
              </div>

              <div className="col-md-3 mb-4">
                <h5>Atención al Cliente</h5>
                <hr />
                <ul className="list-unstyled">
                  <li>Centro de Ayuda</li>
                  <li>Envios y Entregas</li>
                  <li>Devoluciones</li>
                  <li>Estado del Pedido</li>
                  <li>Opciones de Pago</li>
                </ul>
              </div>

              <div className="col-md-3 mb-4">
                <h5>Contactanos</h5>
                <hr />
                <p>
                  Dejanos tu consulta <Link to="/">Aqui</Link><br />
                  Llamanos al <strong>800 802 800</strong><br />
                  Desde celulares <strong>*7700</strong>
                </p>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="mb-0">&copy; 2024 Farmaceutica. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App