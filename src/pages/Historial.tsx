import { useEffect, useState } from "react";
import { getHistorial, type Pedido } from "../scripts/pedidos";

const Historial: React.FC = () => {

    const [historial, setHistorial] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
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
        cargarDatos();
    }, []);

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
            <h2 className="text-center mb-4">📜 Historial de Compras</h2>
            <hr />
            {historial.length === 0 ? (
                <p className="text-center">No has realizado compras aún.</p>
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
                                        <strong>Pedido #{pedido.id}</strong> 
                                        <span className="ms-3 badge bg-success">{pedido.estado}</span>
                                        <span className="ms-auto me-3">Total: ${pedido.montoTotal}</span>
                                    </button>
                                </h2>
                                <div 
                                    id={`collapse${index}`} 
                                    className={`accordion-collapse collapse ${isOpen ? "show" : ""}`} 
                                    aria-labelledby={`heading${index}`} 
                                >
                                    <div className="accordion-body">
                                        <h6>Detalle de Productos:</h6>
                                        <ul>
                                            {pedido.items.map((item, i) => (
                                                <li key={i}>
                                                    {item.cantidad}x <strong>{item.sku}</strong> - (Unitario: ${item.precioUnitario})
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-muted small">ID Seguimiento: {pedido.uuid}</p>
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