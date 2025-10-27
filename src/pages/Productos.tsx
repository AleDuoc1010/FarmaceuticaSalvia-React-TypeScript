import { useState } from "react";
import { medicamento } from "../data/Medicamentos";
import { Compra } from "../modal/Compra";
import { AgregarCarrito } from "../modal/AgregarCarrito";

const Productos: React.FC = () => {

    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");

    const abrirModalCompra = (nombre: string) => {
        setProductoSeleccionado(nombre);

        const modal = new (window as any).bootstrap.Modal(
            document.getElementById("confirmarCompra")
        );
        modal.show();
    };

    const abrirModalAgregarCarrito = (nombre: string) => {
        setProductoSeleccionado(nombre);
        const modal = new (window as any).bootstrap.Modal(
            document.getElementById("agregarCarrito")
        );
        modal.show();
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Productos</h2>
            <hr />
            <div className="row">
                {medicamento.map((prod) => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card h-100">
                            <img src={prod.imagen} className="img-medicamento" alt={prod.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{prod.nombre}</h5>
                                <p className="card-text">{prod.descripcion}</p>
                                <p className="card-text"><strong>Precio: ${prod.precio}</strong></p>
                                <hr />
                                <button className="btn btn-primary w-100" onClick={() => abrirModalCompra(prod.nombre)}>Comprar</button>
                                <br /> <br />
                                <button className="btn btn-primary w-100" onClick={() => abrirModalAgregarCarrito(prod.nombre)}>Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Compra productoSeleccionado={productoSeleccionado}/>
            <AgregarCarrito productoSeleccionado={productoSeleccionado}/>
        </div>
    );
};

export default Productos;
