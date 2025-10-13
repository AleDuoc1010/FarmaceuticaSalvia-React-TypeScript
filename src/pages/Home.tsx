import React from "react";

const Home: React.FC = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">Bienvenido a Farmaceutica</h1>
            <p className="lead text-center">
                Tu destino confiable para productos farmacéuticos de alta calidad.
            </p>
            <div className="text-center">
                <img src="/farmaceutica.jpg" alt="Farmaceutica" className="img-fluid rounded" style={{ maxWidth: '600px' }} />
            </div>
        </div>
    );
};

export default Home;