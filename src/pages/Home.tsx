import { medicamento } from "../data/Medicamentos";

const Home: React.FC = () => {

    const destacados = medicamento.filter(prod => prod.destacado);

    return (
        <>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/inventario-dos-farmaceuticos-en-batas-de-laboratorio-en-el-proceso-de-inventario-en-una-farmacia.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item active">
                    <img src="/abstract-blur-centro-comercial.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item active">
                    <img src="/abstract-blur-centro-comercial (1).jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
        </div>

        <div className="container mt-5">
            <h2 className="text-center mb-4">Productos Destacados</h2>
            <hr />
            <div className="row">
                {destacados.map((prod) => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card h-100">
                            <img src={prod.imagen} className="img-medicamento" alt={prod.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{prod.nombre}</h5>
                                <p className="card-text">{prod.descripcion}</p>
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
        </>
    );
};

export default Home;