import { useState, useEffect, useRef } from "react";
import { productoApi } from "../api/axiosConfig";
import { type Producto } from "../scripts/products";
import { comprarDirecto } from "../scripts/pedidos";

interface CompraProps {
  productoSku?: string;
}

export const Compra: React.FC<CompraProps> = ({ productoSku }) => {
  const [cantidad, setCantidad] = useState(1);
  const [productoInfo, setProductoInfo] = useState<Producto | null> (null);
  const [archivoReceta, setArchivoReceta] = useState<File | null> (null);
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    metodoPago: "",
    cantidad: "",
  });

  useEffect(() => {
    const modalElement = document.getElementById("confirmarCompra");

    const limpiarFormulario = () => {
      setCantidad(1);
      setNombre("");
      setDireccion("");
      setTelefono("");
      setMetodoPago("");
      setArchivoReceta(null);
      setError({ nombre: "", direccion: "", telefono: "", metodoPago: "", cantidad: "" });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setLoading(false);
    };

    modalElement?.addEventListener('hidden.bs.modal', limpiarFormulario);

    return () => {
      modalElement?.removeEventListener('hidden.bs.modal', limpiarFormulario);
    };
  }, []);

  useEffect(() => {
    if (productoSku) {
      productoApi.get<Producto>(`/productos/${productoSku}`)
        .then(res => setProductoInfo(res.data))
        .catch(console.error);
    }
  }, [productoSku]);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/.test(val)) {
      setNombre(val);
    }
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 9) {
      setTelefono(val);
    }
  };

  const validarFormulario = () => {
    const nuevoError = {nombre: "", direccion: "", telefono: "", metodoPago: "", cantidad: ""};
    let esValido = true;

    if(!nombre.trim()) { nuevoError.nombre = "El nombre es obligatorio"; esValido = false; }
    else if (nombre.length < 3) { nuevoError.nombre = "Mínimo 3 caracteres"; esValido = false; }

    if(!direccion.trim()) { nuevoError.direccion = "La dirección es obligatoria"; esValido = false; }
    
    if(!telefono.trim()) { nuevoError.telefono = "El teléfono es obligatorio"; esValido = false; }
    else if (telefono.length < 9) { nuevoError.telefono = "Debe tener 9 dígitos"; esValido = false; }

    if(!metodoPago.trim()) { nuevoError.metodoPago = "El método de pago es obligatorio"; esValido = false; }
    
    if(cantidad < 1){ nuevoError.cantidad = "Mínimo 1"; esValido = false; }

    setError(nuevoError);
    return esValido;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productoSku || !productoInfo) return;
    if (!validarFormulario()) return;

    setLoading(true);

    try {
      await comprarDirecto(productoSku, cantidad);
      alert("Compra Realizada con éxito");

      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById("confirmarCompra"));
      modal?.hide();

    } catch (error: any) {
        console.error(error);
          if (error.response && error.response.data && error.response.data.message){
              alert("Error: " + error.response.data.message);
          } else if (error.response?.status === 403){
              alert("Debes iniciar sesión para comprar.");
          } else {
              alert("Ocurrió un error al comprar.")
          }
      setLoading(false);
    }
  };

  const requiereReceta = productoInfo?.pideReceta;
  const puedeComprar = !requiereReceta || (requiereReceta && archivoReceta);
  const incrementar = () => setCantidad(prev => prev + 1);
  const decrementar = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div
      className="modal fade"
      id="confirmarCompra"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Confirmar Compra: {productoInfo?.nombre}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>

              {requiereReceta && (
                <div className="alert alert-danger mb-3">
                  <label htmlFor="inputReceta" className="form-label fw-bold"> Sube tu Receta Médica</label>
                  <input
                    id="inputReceta"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setArchivoReceta(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
              )}

              <div className="row g-2">
                  <div className="col-12">
                    <label htmlFor="inputNombre" className="form-label">Nombre Completo</label>
                    <input id="inputNombre" type="text" className={`form-control ${error.nombre ? "is-invalid" : ""}`} 
                            value={nombre} onChange={handleNombreChange} placeholder="Ej: Juan Pérez" />
                      {error.nombre && <small className="text-danger">{error.nombre}</small>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="inputDireccion" className="form-label">Dirección de Entrega</label>
                    <input
                      id="inputDireccion"
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
                    <label htmlFor="inputTelefono" className="form-label">Teléfono de contacto</label>
                    <input
                      id="inputTelefono"
                      type="tel"
                      className={`form-control ${error.telefono ? "is-invalid" : ""}`}
                      value={telefono}
                      onChange={handleTelefonoChange}
                      maxLength={9}
                      placeholder="Ej: 912345678"
                    />
                    {error.telefono && (
                      <div className="text-danger small mt-1">{error.telefono}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="selectPago" className="form-label">Método de Pago</label>
                    <select
                      id="selectPago"
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
                  
                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>

                    <div className="input-group">

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={decrementar}
                      >-</button>

                      <input 
                        type="number"
                        className="form-control text-center"
                        min="1"
                        value={cantidad}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if(!isNaN(val) && val > 0) setCantidad(val);
                            else if(e.target.value === "") setCantidad(1);
                            }}
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={incrementar}
                        >+</button>
                      </div>
                  </div>
              </div>
              <div className="mt-4 d-grid">
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled = {loading || !puedeComprar}
                >
                  {loading ? "Procesando..." : `Pagar Total: $${(Number(productoInfo?.precio) || 0) * cantidad}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
