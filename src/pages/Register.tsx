import { register } from "../scripts/forms";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const ok = register({ nombre, email, phone, password });
      if (ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/Login");
      } else {
        setError("Ya existe una cuenta con este correo electrónico.");
      }
    };

  return (
      <div className="container my-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
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
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="\d{9}"
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
          <button className="btn btn-primary w-100">Registrarse</button>
        </form>
      </div>
  );
};
export default Register;