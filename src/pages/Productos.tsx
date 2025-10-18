import { medicamento } from "../data/Medicamentos";

const Productos: React.FC = () => {
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
                                <br /> <br />
                                <p className="card-text"><strong>Precio: ${prod.precio}</strong></p>
                                <hr />
                                <button className="btn btn-primary w-100">Comprar</button>
                                <br /> <br />
                                <button className="btn btn-primary w-100">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Productos;