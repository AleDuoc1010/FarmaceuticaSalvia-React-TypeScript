import { getDestacados, type Producto } from "../scripts/products";
import { Compra } from "../modal/Compra";
import { AgregarCarrito } from "../modal/AgregarCarrito";
import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
  const [destacados, setDestacados] = useState<Producto[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDestacados();
        setDestacados(data.content);
      } catch (error) {
        console.error("Error cargando destacados", error);
      }
    }
    load();
  }, []);

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
  };

  return (
    <>
      {/* Carrusel funcional con Bootstrap */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/inventario-dos-farmaceuticos-en-batas-de-laboratorio-en-el-proceso-de-inventario-en-una-farmacia.jpg"
              className="d-block w-100"
              alt="Farmacéuticos"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/abstract-blur-centro-comercial.jpg"
              className="d-block w-100"
              alt="Centro comercial"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/abstract-blur-centro-comercial (1).jpg"
              className="d-block w-100"
              alt="Farmacia moderna"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Sección de productos destacados */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <hr />
        <div className="row">
          {destacados.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={prod.imagenUrl}
                  className="card-img-top img-medicamento"
                  alt={prod.nombre}
                  style={{ height: "200px", objectFit: "contain" }}
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />

                <div className="card-body">
                  <h5 className="card-title">{prod.nombre}</h5>
                  {prod.pideReceta && (
                    <span className="badge bg-warning text-dark mb-2">
                      Requiere Receta
                    </span>
                  )}

                  <p className="card-text text-muted small">{prod.descripcion}</p>
                  <p className="card-text fs-5">
                    <strong>${prod.precio}</strong>
                  </p>
                  <hr />
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => abrirModalCompra(prod.sku)}
                  >
                    Comprar
                  </button>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => abrirModalAgregarCarrito(prod.sku)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Compra productoSku={productoSeleccionado} />
        <AgregarCarrito productoSku={productoSeleccionado} />
      </div>
    </>
  );
};

export default Home;
