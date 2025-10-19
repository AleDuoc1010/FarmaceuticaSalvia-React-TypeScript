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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!productoSeleccionado) return;

        const nuevaCompra = {
            producto: productoSeleccionado,
            cantidad,
            nombre,
            direccion,
            telefono,
            metodoPago,
            fecha: new Date().toLocaleDateString()
        };

        const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");

        historial.push(nuevaCompra);

        localStorage.setItem("historialCompras", JSON.stringify(historial));

        alert("¡Compra realizada con éxito!");

        const modal = (window as any).bootstrap.Modal.getInstance(
            document.getElementById("confirmarCompra")
        );
        modal.hide();

        setCantidad(1);
        setNombre("");
        setDireccion("");
        setTelefono("");
        setMetodoPago("");
    };

    return (
        <div className="modal fade" id="confirmarCompra" tabIndex={-1} aria-labelledby="compraModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmarCompraLabel">Confirmar Compra</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>

                    <div className="modal-body">
                        <form id="formCompra" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Producto Seleccionado</label>
                                <input type="text" className="form-control" value={productoSeleccionado || ""} readOnly />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Cantidad</label>
                                <input type="number" className="form-control" placeholder="Cantidad" min={1} value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} required/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+" title="Solo se aceptan letras y espacios" required/>                         
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Dirección de Entrega</label>
                                <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Teléfono de contacto</label>
                                <input type="tel" className="form-control" value={telefono} maxLength={9} pattern="\d{9}" placeholder="Ej: 912345678" onChange={(e) => setTelefono(e.target.value)} required/>
                                <div className="form-text">Debe contener exactamente 9 números</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Método de Pago</label>
                                <select className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required>
                                    <option value="" disabled selected>Selecciona un método de pago</option>
                                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="contraEntrega">Contra Entrega</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Confirmar pedido</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};