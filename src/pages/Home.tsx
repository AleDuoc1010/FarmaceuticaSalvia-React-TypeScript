const Home: React.FC = () => {
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

        <section className="container my-5">
            <h2 className="text-center mb-4">Ofertas Destacadas</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                        <img src="https://www.laboratoriochile.cl/wp-content/uploads/2015/11/Paracetamol_500MG_16C_BE_HD.jpg" className="card-img-top" alt="Medicamento" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Paracetamol 500mg</h5>
                            <p className="card-text">Alivio rápido del dolor y fiebre. Caja de 16 comprimidos.</p>
                            <p className="text-success fw-bold">$2.990</p>
                            <button type="button"
                                    className="btn btn-primary comprar-btn"
                                    data-producto="Paracetamol 500mg"
                                    data-bs-toggler="modal"
                                    data-bs-target="#confirmarCompra">
                                        Comprar
                            </button>
                            <br />
                            <br />
                            <button type="button"
                                    className="btn btn-primary agregar-carrito-btn"
                                    data-producto="Paracetamol 500mg"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalAgregarCarrito">
                                        Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="https://farmaciajimenez.com/storage/products/redoxon-vitamina-c-30-comprimidos-efervescentes-naranja/redoxon-vitamina-c-30-compimidos-efervescentes-sabor-naranja-960.jpg" className="card-img-top" alt="Medicamento" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Vitamina C</h5>
                            <p className="card-text">Refuerza tu sistema inmune. Frasco con 30 cápsulas.</p>
                            <p className="text-success fw-bold">$5.490</p>
                            <button type="button"
                                    className="btn btn-primary comprar-btn"
                                    data-producto="Vitamina C"
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmarCompra">
                                        Comprar
                            </button>
                            <br />
                            <br />
                            <button type="button"
                                    className="btn btn-primary agregar-carrito-btn"
                                    data-producto="Vitamina C"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalAgregarCarrito">
                                        Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src="https://farmaciasdeldrsimicl.vtexassets.com/arquivos/ids/156942/BE0155.jpg?v=638012014700170000" className="card-img-top" alt="Medicamento" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Amoxicilina</h5>
                            <p className="card-text">Antibiotico</p>
                            <p className="text-success fw-bold">$10.950</p>
                            <button type="button"
                                    className="btn btn-primary comprar-btn"
                                    data-producto="Amoxicilina"
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmarCompra">
                                        Comprar
                            </button>
                            <br />
                            <br />
                            <button type="button"
                                    className="btn btn-primary agregar-carrito-btn"
                                    data-producto="Amoxicilina"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalAgregarCarrito">
                                        Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        </>
    );
};

export default Home;