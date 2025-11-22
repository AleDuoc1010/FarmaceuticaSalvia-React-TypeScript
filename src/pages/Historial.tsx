import { useEffect, useState } from "react";
import { getHistorial, borrarHistorial, eliminarPedidoHistorial, type Pedido } from "../scripts/pedidos";

const Historial: React.FC = () => {

    const [historial, setHistorial] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const cargarDatos = async () => {
        try {
            const data = await getHistorial();
            setHistorial(data);
        } catch (error) {
            console.error("Error cargando historial", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleEliminarPedido = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este registro del historial?")) return;
        try {
            await eliminarPedidoHistorial(id);
            setActiveIndex(null);
            cargarDatos();
        } catch (error) {
            alert("Error al eliminar el registro.");
        }
    };

    const handleVaciarHistorial = async () => {
        if (!confirm("¿Estás seguro de borrar TODO tu historial de compras?")) return;
        try {
            await borrarHistorial();
            cargarDatos();
        } catch (error) {
            alert("Error al vaciar el historial.");
        }
    };

    const toggleAccordion = (index:number) => {
        if (activeIndex === index){
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando historial...</div>;

    return (
        <div className="container mt-5">
            <div 
                className={`mb-4 ${
                    historial.length === 0 
                        ? "text-center"
                        : "d-flex justify-content-between align-items-center"
                }`}
            >
                <h2 className="mb-0">📜 Historial de Compras</h2>
                
                {historial.length > 0 && (
                    <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={handleVaciarHistorial}
                    >
                        Vaciar Historial
                    </button>
                )}
            </div>
            
            <hr />

            {historial.length === 0 ? (
                <div className="alert alert-info text-center">
                    No has realizado compras aún.
                </div>
            ) : (
                <div className="accordion" id="accordionHistorial">
                    {historial.map((pedido, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div className="accordion-item" key={pedido.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button 
                                        className={`accordion-button ${isOpen ? "" : "collapsed"}`} 
                                        type="button" 
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="d-flex w-100 justify-content-between align-items-center me-3">
                                            <span><strong>Pedido #{pedido.id}</strong></span>
                                            <div>
                                                <span className="badge bg-success me-3">{pedido.estado}</span>
                                                <span className="fw-bold text-primary">${pedido.montoTotal}</span>
                                            </div>
                                        </div>
                                    </button>
                                </h2>
                                <div 
                                    id={`collapse${index}`} 
                                    className={`accordion-collapse collapse ${isOpen ? "show" : ""}`} 
                                    aria-labelledby={`heading${index}`} 
                                >
                                    <div className="accordion-body">
                                        <h6 className="border-bottom pb-2 mb-3">Detalle de Productos:</h6>
                                        <ul className="list-group mb-3">
                                            {pedido.items.map((item, i) => (
                                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <span className="fw-bold">{item.cantidad}x</span> {item.sku}
                                                    </div>
                                                    <span className="text-muted">${item.precioUnitario} c/u</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="d-flex justify-content-between align-items-end mt-3">
                                            <small className="text-muted">UUID: {pedido.uuid}</small>
                                            
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleEliminarPedido(pedido.id)}
                                            >
                                                Eliminar Registro
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default Historial;