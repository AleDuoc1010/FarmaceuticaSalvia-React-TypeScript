import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/Productos";
import { getAllProductos } from "../scripts/products";

vi.mock("../scripts/products", () => ({
  getAllProductos: vi.fn(),
}));

vi.mock("../modal/Compra", () => ({
  Compra: () => <div data-testid="modal-compra">Mock Modal Compra</div>,
}));

vi.mock("../modal/AgregarCarrito", () => ({
  AgregarCarrito: () => <div data-testid="modal-carrito">Mock Modal Carrito</div>,
}));

describe("Componente Productos", () => {

  const mockProductosData = {
    content: [
      {
        id: 1,
        sku: "PAR-500",
        nombre: "Paracetamol",
        descripcion: "Para el dolor",
        precio: "2000",
        imagenUrl: "http://img.com/foto.jpg",
        destacado: false,
        pideReceta: false,
      },
      {
        id: 2,
        sku: "ANT-100",
        nombre: "Antibiótico Fuerte",
        descripcion: "Requiere supervisión",
        precio: "5000",
        imagenUrl: "http://img.com/foto2.jpg",
        destacado: true,
        pideReceta: true,
      },
    ],
    totalPages: 1,
    totalElements: 2,
  };

  let modalShowSpy: any;

  beforeEach(() => {
    modalShowSpy = vi.spyOn((window as any).bootstrap.Modal.prototype, 'show');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Muestra estado de carga inicialmente", () => {
    (getAllProductos as any).mockReturnValue(new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando Productos.../i)).toBeInTheDocument();
  });

  it("Renderiza la lista de productos correctamente al cargar la API", async () => {
    (getAllProductos as any).mockResolvedValue(mockProductosData);

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Paracetamol")).toBeInTheDocument();
      expect(screen.getByText("Antibiótico Fuerte")).toBeInTheDocument();
      expect(screen.getByText("$2000")).toBeInTheDocument();
      expect(screen.getByText("$5000")).toBeInTheDocument();
    });
  });

  it("Muestra la etiqueta 'Requiere Receta' solo en los productos correspondientes", async () => {
    (getAllProductos as any).mockResolvedValue(mockProductosData);

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
        const badges = screen.queryAllByText(/Requiere Receta/i);
        expect(badges).toHaveLength(1);
    });
  });

  it("Abre el modal de Compra al hacer click en el botón 'Comprar'", async () => {
    (getAllProductos as any).mockResolvedValue(mockProductosData);

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Paracetamol"));

    const botonesComprar = screen.getAllByRole("button", { name: /Comprar/i });
    fireEvent.click(botonesComprar[0]);

    expect(modalShowSpy).toHaveBeenCalled();
  });

  it("Abre el modal de Carrito al hacer click en 'Añadir al carrito'", async () => {
    (getAllProductos as any).mockResolvedValue(mockProductosData);

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Paracetamol"));

    const botonesCarrito = screen.getAllByRole("button", { name: /Añadir al carrito/i });
    fireEvent.click(botonesCarrito[1]);

    expect(modalShowSpy).toHaveBeenCalled();
  });

});