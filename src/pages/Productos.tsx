const Productos: React.FC = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">Nuestros Productos</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src="/producto1.jpg" className="card-img-top" alt="Producto 1" />
                        <div className="card-body">
                            <h5 className="card-title">Producto 1</h5>
                            <p className="card-text">Descripción breve del Producto 1.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Precio: $10.00</small>
                        </div>  
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src="/producto2.jpg" className="card-img-top" alt="Producto 2" />
                        <div className="card-body">
                            <h5 className="card-title">Producto 2</h5>
                            <p className="card-text">Descripción breve del Producto 2.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Precio: $15.00</small>
                        </div>  
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src="/producto3.jpg" className="card-img-top" alt="Producto 3" />
                        <div className="card-body">
                            <h5 className="card-title">Producto 3</h5>
                            <p className="card-text">Descripción breve del Producto 3.</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Precio: $20.00</small>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Productos;