import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, recuperarClave } from "../scripts/forms";
import { Link } from "react-router-dom";

const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      alert("Inicio de sesión exitoso.");
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleRecuperar = () => {
    const clave = recuperarClave();
    if (clave) alert (`Tu contraseña es: ${clave}`);
    else alert("no hay usuario registrado.");
  };

 return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100">Iniciar sesión</button>
        <button
          type="button"
          className="btn btn-link w-100 mt-2"
          onClick={handleRecuperar}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <button type="button" className="btn btn-link w-100 mt-2">
          <Link to="/register">
            Crear cuenta
          </Link>
        </button>
      </form>
    </div>
  );
}
export default Login;