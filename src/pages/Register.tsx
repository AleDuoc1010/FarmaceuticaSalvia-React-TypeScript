import { useState } from "react";
import { register } from "../scripts/forms";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones campo a campo
    if (!nombre) {
      setError("El nombre no puede estar vacío");
      return;
    }
    if (!email) {
      setError("El correo no puede estar vacío");
      return;
    }
    if (!phone) {
      setError("El teléfono no puede estar vacío");
      return;
    }
    if (!password) {
      setError("La contraseña no puede estar vacía");
      return;
    }

    // Validar formato de correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(email)) {
      setError("El formato del correo no es válido");
      return;
    }

    // Registrar usuario
    const exito = register({ nombre, email, phone, password });
    if (exito) {
      alert("Registro exitoso");
      setError("");
      setNombre("");
      setEmail("");
      setPhone("");
      setPassword("");
    } else {
      setError("El usuario ya está registrado");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Crear cuenta</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-light shadow"
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
