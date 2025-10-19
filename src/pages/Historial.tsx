import { useEffect, useState } from "react";

    interface Compra {
        producto: string;
        cantidad: number;
        nombre: string;
        direccion: string;
        telefono: string;
        metodoPago: string;
        fecha: string;
    }

const Historial: React.FC = () => {

    const [historial, setHistorial] = useState<Compra[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("historialCompras") || "[]");
        setHistorial(data);
    }, []);

    const eliminarCompra = (index: number) => {
        const nuevoHistorial = historial.filter((_, i) => i !== index);
        setHistorial(nuevoHistorial);
        localStorage.setItem("historialCompras", JSON.stringify(nuevoHistorial));
    };

    const vaciarHistorial = () => {
        localStorage.removeItem("historialCompras");
        setHistorial([]);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">📜 Historial de Compras</h2>
            <hr />
            {historial.length === 0 ? (
                <p className="text-center">No hay compras realizadas.</p>
            ) : (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Método de Pago</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((compra, index) => (
                                <tr key={index}>
                                    <td>{compra.producto}</td>
                                    <td>{compra.cantidad}</td>
                                    <td>{compra.nombre}</td>
                                    <td>{compra.direccion}</td>
                                    <td>{compra.telefono}</td>
                                    <td>{compra.metodoPago}</td>
                                    <td>{compra.fecha}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => eliminarCompra(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={vaciarHistorial}>Vaciar Historial</button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Historial;