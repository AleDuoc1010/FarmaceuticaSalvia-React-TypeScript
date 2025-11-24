import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../scripts/forms";
import { AxiosError } from "axios";

type LoginProps = {
  onLoginSuccess?: () => void;
};

const Login: React.FC<LoginProps> = ({onLoginSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ email: "", password: "", general: "" });
    let hayErrores = false;
    const nuevosErrores = { email: "", password: "", general: ""}
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.trim()) {
        nuevosErrores.email = "El correo no puede estar vacío";
        hayErrores = true;
      } else if (!emailRegex.test(email)) {
        nuevosErrores.email = "El formato del correo no es válido";
        hayErrores = true;
      }

      if (!password.trim()) {
        nuevosErrores.password = "La contraseña no puede estar vacía";
        hayErrores = true;
      } else if (password.length < 6) {
        nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
        hayErrores = true;
      }

      if(hayErrores){
        setError(nuevosErrores);
        return
      }
    
      try {
        await login({ email, password});

        alert("Inicio de sesión exitoso.");

        if (onLoginSuccess){
          onLoginSuccess();
        }

        navigate("/");

      } catch (err) {
        const errorAxios = err as AxiosError;

        if (errorAxios.response?.status === 401 || errorAxios.response?.status === 403) {
          setError(prev => ({ ...prev, general: "Correo o contraseña incorrectos"}));
        } else {
          setError(prev => ({ ...prev, general: "Error en la conexión con el servidor"}));
          console.error(err);
        }
      }
    };
  
    return (
      <div className="container my-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} noValidate className="p-4 border rounded bg-light shadow">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Correo</label>
            <input
              id="email"
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
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
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

          <button className="btn btn-primary w-100" type="submit">Iniciar sesión</button>

          <Link to="/register" className="btn btn-link w-100 mt-2">
            Crear cuenta
          </Link>
        </form>
      </div>
    );
};

export default Login;
