import { useState } from "react";

interface CompraProps {
  productoSeleccionado?: string;
}

export const Compra: React.FC<CompraProps> = ({ productoSeleccionado }) => {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const [error, setError] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    metodoPago: "",
    cantidad: "",
  });

  const validarFormulario = () => {
    const nuevoError = {
      nombre: "",
      direccion: "",
      telefono: "",
      metodoPago: "",
      cantidad: "",
    };
    let esValido = true;

    // 🔹 Validar nombre
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombre.trim()) {
      nuevoError.nombre = "El nombre no puede estar vacío.";
      esValido = false;
    } else if (!nombreRegex.test(nombre)) {
      nuevoError.nombre = "El nombre solo puede contener letras y espacios.";
      esValido = false;
    } else if (nombre.length < 3) {
      nuevoError.nombre = "El nombre debe tener al menos 3 caracteres.";
      esValido = false;
    }

    // 🔹 Validar dirección
    if (!direccion.trim()) {
      nuevoError.direccion = "La dirección no puede estar vacía.";
      esValido = false;
    }

    // 🔹 Validar teléfono
    const phoneRegex = /^\d{9}$/;
    if (!telefono.trim()) {
      nuevoError.telefono = "El teléfono no puede estar vacío.";
      esValido = false;
    } else if (!phoneRegex.test(telefono)) {
      nuevoError.telefono = "El teléfono debe tener exactamente 9 dígitos numéricos.";
      esValido = false;
    }

    // 🔹 Validar método de pago
    if (!metodoPago.trim()) {
      nuevoError.metodoPago = "Debes seleccionar un método de pago.";
      esValido = false;
    }

    // 🔹 Validar cantidad
    if (cantidad < 1) {
      nuevoError.cantidad = "La cantidad debe ser al menos 1.";
      esValido = false;
    }

    setError(nuevoError);
    return esValido;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productoSeleccionado) return;

    if (!validarFormulario()) return;

    const nuevaCompra = {
      producto: productoSeleccionado,
      cantidad,
      nombre,
      direccion,
      telefono,
      metodoPago,
      fecha: new Date().toLocaleDateString(),
    };

    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    historial.push(nuevaCompra);
    localStorage.setItem("historialCompras", JSON.stringify(historial));

    alert("¡Compra realizada con éxito!");

    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById("confirmarCompra")
    );
    modal.hide();

    // limpiar campos
    setCantidad(1);
    setNombre("");
    setDireccion("");
    setTelefono("");
    setMetodoPago("");
    setError({
      nombre: "",
      direccion: "",
      telefono: "",
      metodoPago: "",
      cantidad: "",
    });
  };

  return (
    <div
      className="modal fade"
      id="confirmarCompra"
      tabIndex={-1}
      aria-labelledby="compraModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmarCompraLabel">
              Confirmar Compra
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body">
            <form id="formCompra" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Producto Seleccionado</label>
                <input
                  type="text"
                  className="form-control"
                  value={productoSeleccionado || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className={`form-control ${error.cantidad ? "is-invalid" : ""}`}
                  min={1}
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                />
                {error.cantidad && (
                  <div className="text-danger small mt-1">{error.cantidad}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className={`form-control ${error.nombre ? "is-invalid" : ""}`}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {error.nombre && (
                  <div className="text-danger small mt-1">{error.nombre}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección de Entrega</label>
                <input
                  type="text"
                  className={`form-control ${error.direccion ? "is-invalid" : ""}`}
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
                {error.direccion && (
                  <div className="text-danger small mt-1">{error.direccion}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono de contacto</label>
                <input
                  type="tel"
                  className={`form-control ${error.telefono ? "is-invalid" : ""}`}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  maxLength={9}
                  placeholder="Ej: 912345678"
                />
                {error.telefono && (
                  <div className="text-danger small mt-1">{error.telefono}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Método de Pago</label>
                <select
                  className={`form-select ${error.metodoPago ? "is-invalid" : ""}`}
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="">Selecciona un método de pago</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="paypal">PayPal</option>
                  <option value="contraEntrega">Contra Entrega</option>
                </select>
                {error.metodoPago && (
                  <div className="text-danger small mt-1">{error.metodoPago}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Confirmar pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
