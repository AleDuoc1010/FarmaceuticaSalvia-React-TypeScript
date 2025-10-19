import { useEffect, useState } from "react";

interface Carrito{
    producto: string;
    cantidad: number;
}

const Carrito: React.FC = () => {

    const [carrito, setCarrito] = useState<Carrito[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("carritoCompras") || "[]");
        setCarrito(data);
    }, []);

    const eliminarCarrito = (index: number) => {
        const nuevoCarrito = carrito.filter((_, i) => i !== index);
        setCarrito(nuevoCarrito);
        localStorage.setItem("carritoCompras", JSON.stringify(nuevoCarrito));
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carritoCompras");
        setCarrito([]);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>
            <hr />
            {carrito.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.producto}</td>
                                    <td>{item.cantidad}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => eliminarCarrito(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar Carrito</button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Carrito;