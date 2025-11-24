import { useState } from "react";
import { register, type RegisterData} from "../scripts/forms";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ nombre: "", email: "", phone: "", password: "", general: ""});
  const navigate = useNavigate();

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/.test(val)) {
      setNombre(val);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^\d*$/.test(val) && val.length <= 9) {
      setPhone(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError({ nombre: "", email: "", phone: "", password: "", general: "" });
    
    let hayErrores = false;
    const nuevosErrores = { nombre: "", email: "", phone: "", password: "", general: "" };

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío";
      hayErrores = true;
    } else if (nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 letras";
      hayErrores = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nuevosErrores.email = "El correo no puede estar vacío";
      hayErrores = true;
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = "El formato del correo no es válido";
      hayErrores = true;
    }

    if (!phone.trim()) {
      nuevosErrores.phone = "El teléfono no puede estar vacío";
      hayErrores = true;
    } else if (phone.length !== 9) {
      nuevosErrores.phone = "El teléfono debe tener exactamente 9 dígitos";
      hayErrores = true;
    }

    if (!password.trim()) {
      nuevosErrores.password = "La contraseña no puede estar vacía";
      hayErrores = true;
    } else if (password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
      hayErrores = true;
    }

    if (hayErrores) {
      setError(nuevosErrores);
      return;
    }

    try {
      const data: RegisterData = { nombre, email, phone, password };
      await register(data);

      alert("Registro exitoso. Ahora puedes iniciar sesión");
      navigate("/login");

    } catch (err) {
      const errorAxios = err as AxiosError;

      if (errorAxios.response?.status === 409) {
        setError(prev => ({ ...prev, general: "El correo electrónico ya está registrado." }));
      } else {
        setError(prev => ({ ...prev, general: "Ocurrió un error al registrarse. Intente nuevamente." }));
        console.error(err);
      }
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
            className={`form-control ${error.nombre ? "is-invalid" : ""}`}
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ej: Juan Pérez"
          />
          {error.nombre && (
            <div className="text-danger small mt-1">{error.nombre}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${error.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
          {error.email && (
            <div className="text-danger small mt-1">{error.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            className={`form-control ${error.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Ej: 912345678"
            maxLength={9}
          />
          {error.phone && (
            <div className="text-danger small mt-1">{error.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
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

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
