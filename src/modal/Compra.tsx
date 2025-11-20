import React,{ useState, useEffect } from "react";
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

  const [error, setError] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    metodoPago: "",
    cantidad: "",
  });

  useEffect(() => {
    if (productoSku) {
      productoApi.get<Producto>(`/productos/${productoSku}`)
        .then(res => setProductoInfo(res.data))
        .catch(console.error);
    }
  }, [productoSku]);

  const validarFormulario = () => {
    const nuevoError = {nombre: "", direccion: "", telefono: "", metodoPago: "", cantidad: ""};
    let esValido = true;

    if(!nombre.trim()) {nuevoError.nombre = "Requerido" ; esValido = false;}
    if(!direccion.trim()) {nuevoError.direccion = "Requerido" ; esValido = false;}
    if(!telefono.trim()) {nuevoError.telefono = "Requerido" ; esValido = false;}
    if(!metodoPago.trim()) {nuevoError.metodoPago = "Requerido" ; esValido = false;}
    if(!cantidad) {nuevoError.cantidad = "Requerido" ; esValido = false;}

    if(cantidad < 1){
      nuevoError.cantidad = "Mínimo 1";
      esValido = false;
    }

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

      setCantidad(1);
      setNombre(""); setDireccion(""); setTelefono(""); setMetodoPago(""); setArchivoReceta(null);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) alert("Error: " + error.response.data.message);
      else if (error.response?.status === 403) alert("Debes iniciar sesión.");
      else alert("Error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  const requiereReceta = productoInfo?.pideReceta;
  const puedeComprar = !requiereReceta || (requiereReceta && archivoReceta);

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
                  <label className="form-label fw-bold"> Sube tu Receta Médica</label>
                  <input 
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setArchivoReceta(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
              )}

              <div className="row g-2">
                <div className="col-12">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className={`form-control ${error.nombre ? "is-invalid" : ""}`} 
                          value={nombre} onChange={e => setNombre(e.target.value)} />
                    {error.nombre && <small className="text-danger">{error.nombre}</small>}
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
                  
                  <div className="mb-3">
                     <label className="form-label">Cantidad</label>
                     <input type="number" className="form-control" min="1" value={cantidad} onChange={e => setCantidad(parseInt(e.target.value))} />
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
