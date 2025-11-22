import { useState, useEffect, useRef } from "react";
import { productoApi } from "../api/axiosConfig";
import { type Producto } from "../scripts/products";
import { agregarAlCarrito } from "../scripts/pedidos";

interface Props {
    productoSku: string;
}

export const AgregarCarrito: React.FC<Props> = ({ productoSku }) => {

    const [cantidad, setCantidad] = useState(1);
    const [productoInfo, setProductoInfo] = useState<Producto |null>(null);
    const [archivoReceta, setArchivoReceta] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const modalElement = document.getElementById("agregarCarrito");

        const limpiarFormulario = () => {
            setCantidad(1);
            setArchivoReceta(null);
            
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setLoading(false);
        };

        modalElement?.addEventListener('hidden.bs.modal', limpiarFormulario);
        return () => modalElement?.removeEventListener('hidden.bs.modal', limpiarFormulario);
    }, []);

    useEffect(() => {
        if (productoSku) {
            cargarInfoProducto()
        }
    }, [productoSku])

    const cargarInfoProducto = async () => {
        try {
            const res = await productoApi.get<Producto>(`/productos/${productoSku}`);
            setProductoInfo(res.data);
        } catch (error) {
            console.error("Error cargando info del producto", error);
            setProductoInfo(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productoSku || !productoInfo) return;
        if (cantidad < 1) return;

        setLoading(true);

        try {
            await agregarAlCarrito(productoSku, cantidad);

            alert(`¡${productoInfo.nombre} añadido al carrito con éxito!`)

            const modalEL = document.getElementById("agregarCarrito");
            const modal = (window as any).bootstrap.Modal.getInstance(modalEL);
            modal?.hide();

        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message){
                alert("Error: " + error.response.data.message);
            } else if (error.response?.status === 403){
                alert("Debes iniciar sesión para comprar.");
            } else {
                alert("Ocurrió un error al agregar al carrito.")
            }
            setLoading(false);
        }
            

    };

    const requiereReceta = productoInfo?.pideReceta;
    const puedeAgregar = !requiereReceta || (requiereReceta && archivoReceta);

    return (
        <div className="modal fade" id="agregarCarrito" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Añadir al Carrito</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>

                    <div className="modal-body">
                        {productoInfo ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={productoInfo.nombre}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Cantidad</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                                    />
                                </div>

                                {requiereReceta && (
                                    <div className="alert alert-warning border-warning">
                                        <p className="mb-2 fw-bold">Receta Medica Requerida</p>
                                        <p className="small mb-2">
                                            Este medicamento requiere receta. Por favor, sube una foto para validar.
                                        </p>
                                        <input 
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={(e) => setArchivoReceta(e.target.files ? e.target.files[0] : null)}
                                        />
                                    </div>
                                )}

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled= {!puedeAgregar || loading}
                                    >
                                        {loading ? "Procesando..." : "Añadir al Carrito"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-center">Cargando información del producto...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};