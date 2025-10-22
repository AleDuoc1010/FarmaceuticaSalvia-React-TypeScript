import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, recuperarClave } from "../scripts/forms";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();

  // 🔹 Validar formulario antes de intentar iniciar sesión
  const validarFormulario = () => {
    const nuevoError = { email: "", password: "", general: "" };
    let esValido = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nuevoError.email = "El correo no puede estar vacío";
      esValido = false;
    } else if (!emailRegex.test(email)) {
      nuevoError.email = "El formato del correo no es válido";
      esValido = false;
    }

    if (!password.trim()) {
      nuevoError.password = "La contraseña no puede estar vacía";
      esValido = false;
    } else if (password.length < 6) {
      nuevoError.password = "La contraseña debe tener al menos 6 caracteres";
      esValido = false;
    }

    setError(nuevoError);
    return esValido;
  };

  // 🔹 Intentar iniciar sesión
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const ok = login(email, password);

    if (ok) {
      alert("Inicio de sesión exitoso.");
      navigate("/"); // redirige al home
    } else {
      setError((prev) => ({
        ...prev,
        general: "Correo o contraseña incorrectos",
      }));
    }
  };

  // 🔹 Recuperar contraseña
  const handleRecuperar = () => {
    const clave = recuperarClave(email);
    if (clave) alert(`Tu contraseña es: ${clave}`);
    else alert("No hay usuario registrado con ese correo.");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} noValidate className="p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className={`form-control ${error.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <div className="text-danger small mt-1">{error.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${error.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <div className="text-danger small mt-1">{error.password}</div>
          )}
        </div>

        {error.general && (
          <div className="alert alert-danger">{error.general}</div>
        )}

        <button className="btn btn-primary w-100">Iniciar sesión</button>

        <button
          type="button"
          className="btn btn-link w-100 mt-2"
          onClick={handleRecuperar}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <Link to="/register" className="btn btn-link w-100 mt-2">
          Crear cuenta
        </Link>
      </form>
    </div>
  );
};

export default Login;
