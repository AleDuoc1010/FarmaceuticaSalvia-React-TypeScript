import { register } from "../scripts/forms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    nombre: "",
    email: "",
    phone: "",
    password: "",
    general: "",
  });

  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevoError = {
      nombre: "",
      email: "",
      phone: "",
      password: "",
      general: "",
    };
    let esValido = true;

    if (!nombre.trim()) {
      nuevoError.nombre = "El nombre no puede estar vacío.";
      esValido = false;
    } else if (nombre.length < 3) {
      nuevoError.nombre = "El nombre debe tener al menos 3 caracteres.";
      esValido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nuevoError.email = "El correo no puede estar vacío.";
      esValido = false;
    } else if (!emailRegex.test(email)) {
      nuevoError.email = "El formato del correo no es válido.";
      esValido = false;
    }

    const phoneRegex = /^\d{9}$/;
    if (!phone.trim()) {
      nuevoError.phone = "El teléfono no puede estar vacío.";
      esValido = false;
    } else if (!phoneRegex.test(phone)) {
      nuevoError.phone = "El teléfono debe tener 9 dígitos numéricos.";
      esValido = false;
    }

    if (!password.trim()) {
      nuevoError.password = "La contraseña no puede estar vacía.";
      esValido = false;
    } else if (password.length < 6) {
      nuevoError.password = "La contraseña debe tener al menos 6 caracteres.";
      esValido = false;
    }

    setError(nuevoError);
    return esValido;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const ok = register({nombre, email, phone, password});

    if (ok) {
      alert("Registro exitoso. Ahora puedes iniciar sesión");
      navigate("/login");
    } else {
      setError((prev) => ({
        ...prev,
        general: "Ya existe un usuario registrado con ese correo.",
      }));
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Crear cuenta</h2>
      <form onSubmit={handleSubmit} noValidate className="p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className={`form-control ${error.nombre ? "is-invalid" : ""}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {error.nombre && <div className="text-danger small mt-1">{error.nombre}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className={`form-control ${error.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <div className="text-danger small mt-1">{error.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className={`form-control ${error.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="\d{9}"
          />
          {error.phone && <div className="text-danger small mt-1">{error.phone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${error.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <div className="text-danger small mt-1">{error.password}</div>}
        </div>

        {error.general && <div className="alert alert-danger">{error.general}</div>}

        <button className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
