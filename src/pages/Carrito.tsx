import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarrito, eliminarItemCarrito, pagarCarrito, actualizarCantidad, vaciarCarrito,type Pedido } from "../scripts/pedidos";

const Carrito: React.FC = () => {

    const [carrito, setCarrito] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const cargarDatos = async () => {
        setLoading(true);
        const data = await getCarrito();
        setCarrito(data);
        setLoading(false);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleEliminar = async(sku:string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            await eliminarItemCarrito(sku);
            cargarDatos();
        } catch (error) {
            alert("Error al eliminar item");
        }
    };

    const handlePagar = async () => {
        if (!confirm("¿Confirmar pago?")) return;
        try {
            await pagarCarrito();
            alert("Pago realizado con éxito");
            setCarrito(null);
            navigate("/historial");
        } catch (error) {
            alert("Error al procesar el pago.");
        }
    };

    const handleCambiarCantidad = async(sku: string, cantidadActual: number, delta: number) => {
        const nuevaCantidad = cantidadActual + delta;
        if (nuevaCantidad < 1) return;

        try{
            await actualizarCantidad(sku, nuevaCantidad);
            cargarDatos();
        } catch (error: any){
            if (error.response?.data?.message){
                alert(error.response.data.message);
            }
        }
    };

    const handleVaciar = async () => {
        if(!confirm("¿Vaciar todo el carrito?")) return;
        await vaciarCarrito();
        cargarDatos();
    };

    if (loading) return <div className="text-center mt-5">Cargando carrito...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>
            <hr />
            {!carrito || carrito.items.length === 0 ? (
                <div className="text-center">
                    <p>El carrito está vacío.</p>
                    <button className="btn btn-primary" onClick={() => navigate("/productos")}>Ir a Comprar</button>
                </div>
            ) : (
                <>
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Producto (SKU)</th>
                                <th>Precio Unit.</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.sku}</td>
                                    <td>${item.precioUnitario}</td>
                                    <td style={{ minWidth: "120px" }}>
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary fw-bold"
                                                style={{ width: "30px" }}
                                                onClick={() => handleCambiarCantidad(item.sku, item.cantidad, -1)}
                                            >-</button>

                                            <span className="fw-bold" style={{ minWidth: "20px", textAlign: "center" }}>{item.cantidad}</span>

                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                style={{ width: "30px" }}
                                                onClick={() => handleCambiarCantidad(item.sku, item.cantidad, 1)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td>${item.subtotal}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => handleEliminar(item.sku)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
                        <h4>Total: <strong>${carrito.montoTotal}</strong></h4>
                        <button className="btn btn-success btn-lg" onClick={handlePagar}>
                            Pagar Carrito
                        </button>

                        <button className="btn btn-outline-danger" onClick={handleVaciar}>
                            Vaciar Carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Carrito;