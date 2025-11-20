import { useState, useEffect } from "react";
import { getAllProductos, type Producto } from "../scripts/products";
import { Compra } from "../modal/Compra";
import { AgregarCarrito } from "../modal/AgregarCarrito";

const Productos: React.FC = () => {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await getAllProductos(0);
            setProductos(data.content);
        } catch (error) {
            console.error("Error cargando productos: ", error);
        } finally {
            setLoading(false);
        }
    };

    const abrirModalCompra = (sku: string) => {
        setProductoSeleccionado(sku);

        const modal = new (window as any).bootstrap.Modal(
            document.getElementById("confirmarCompra")
        );
        modal.show();
    };

    const abrirModalAgregarCarrito = (sku: string) => {
        setProductoSeleccionado(sku);
        const modal = new (window as any).bootstrap.Modal(
            document.getElementById("agregarCarrito")
        );
        modal.show();
    }

    if (loading) return <div className="text-center mt-5">Cargando Productos...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Productos</h2>
            <hr />
            <div className="row">
                {productos.map((prod) => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card h-100 shadow-sm">

                            <img src={prod.imagenUrl} className="card-img-top img-medicamento" alt={prod.nombre}
                            style={{ height: "200px", objectFit: "contain" }} onError={(e) => (e.currentTarget.src = "/placeholder.jpg")} />

                            <div className="card-body">
                                <h5 className="card-title">{prod.nombre}</h5>
                                {prod.pideReceta && <span className="badge bg-warning text-dark mb-2">Requiere Receta</span>}

                                <p className="card-text text-muted small">{prod.descripcion}</p>
                                <p className="card-text fs-5"><strong>${prod.precio}</strong></p>

                                <hr />

                                <button className="btn btn-primary w-100 mb-2" onClick={() => abrirModalCompra(prod.sku)}>Comprar</button>
                                <br /> <br />
                                <button className="btn btn-outline-primary w-100" onClick={() => abrirModalAgregarCarrito(prod.sku)}>Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Compra productoSku={productoSeleccionado}/>
            <AgregarCarrito productoSku={productoSeleccionado}/>
        </div>
    );
};

export default Productos;
