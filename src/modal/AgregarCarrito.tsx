import { useState } from "react";

interface AgregarCarritoProps {
    productoSeleccionado?: string;
}

export const AgregarCarrito: React.FC<AgregarCarritoProps> = ({ productoSeleccionado }) => {

    const [cantidad, setCantidad] = useState(1);
    const [nombre, setNombre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!productoSeleccionado) return;

        const nuevoProducto = {
            producto: productoSeleccionado,
            cantidad,
            nombre
        };

        const carrito = JSON.parse(localStorage.getItem("carritoCompras") || "[]");

        const productoExistente = carrito.find((item: any) => item.producto === productoSeleccionado);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push(nuevoProducto);
        };

        localStorage.setItem("carritoCompras", JSON.stringify(carrito));

        alert("¡Producto añadido al carrito con éxito!");

        const modal = (window as any).bootstrap.Modal.getInstance(
            document.getElementById("agregarCarrito")
        );
        modal.hide();

        setCantidad(1);
        setNombre("");
    };

    return (
        <div className="modal fade" id="agregarCarrito" tabIndex={-1} aria-labelledby="agregarCarritoLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="agregarCarritoLabel">Añadir al Carrito</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>

                    <div className="modal-body">
                        <form id="formAgregarCarrito" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Producto Seleccionado</label>
                                <input type="text" className="form-control" value={productoSeleccionado || ""} readOnly />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Cantidad</label>
                                <input type="number" className="form-control" placeholder="Cantidad" min={1} value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} required/>
                            </div>

                            <button type="submit" className="btn btn-primary">Añadir al carrito</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}