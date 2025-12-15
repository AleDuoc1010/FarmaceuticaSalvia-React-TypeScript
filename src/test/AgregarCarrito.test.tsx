import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AgregarCarrito } from "../modal/AgregarCarrito";
import { agregarAlCarrito } from "../scripts/pedidos";
import { productoApi } from "../api/axiosConfig"; 


vi.mock("../scripts/pedidos", () => ({
  agregarAlCarrito: vi.fn(),
}));

vi.mock("../api/axiosConfig", () => ({
  productoApi: {
    get: vi.fn(),
  },
  pedidosApi: {
    post: vi.fn(),
  }
}));

describe("Componente Modal AgregarCarrito", () => {
  const skuPrueba = "PAR-500";
  
  const mockProductoInfo = {
    data: {
      nombre: "Paracetamol Test",
      pideReceta: false,
      precio: 1000
    }
  };

  let mockHide = vi.fn();

  beforeEach(() => {
    mockHide = vi.fn();
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const mockModalInstance = {
        show: vi.fn(),
        hide: mockHide,
        dispose: vi.fn(),
    };

    (window as any).bootstrap = {
      Modal: vi.fn().mockImplementation(() => mockModalInstance)
    };

    (window as any).bootstrap.Modal.getInstance = vi.fn().mockReturnValue(mockModalInstance);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza correctamente con la cantidad inicial en 1", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoInfo);

    render(<AgregarCarrito productoSku={skuPrueba} />);

    expect(await screen.findByDisplayValue("Paracetamol Test")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /Añadir al Carrito/i, hidden: true })).toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: /Añadir al Carrito/i, hidden: true })).toBeInTheDocument();

    expect(screen.getByDisplayValue("1")).toBeInTheDocument(); 
  });

  it("Aumenta la cantidad al hacer click en '+'", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoInfo);

    render(<AgregarCarrito productoSku={skuPrueba} />);

    await screen.findByDisplayValue("Paracetamol Test");

    const botonMas = screen.getByText("+");
    fireEvent.click(botonMas);
    fireEvent.click(botonMas);

    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
  });

  it("No permite bajar de 1 al hacer click en '-'", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoInfo);

    render(<AgregarCarrito productoSku={skuPrueba} />);
    
    await screen.findByDisplayValue("Paracetamol Test");

    const botonMenos = screen.getByText("-");
    
    fireEvent.click(botonMenos); 
    
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("Llama a la API con el SKU y la cantidad correcta al guardar", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoInfo);
    (agregarAlCarrito as any).mockResolvedValue({ success: true });

    render(<AgregarCarrito productoSku={skuPrueba} />);

    await screen.findByDisplayValue("Paracetamol Test");

    fireEvent.click(screen.getByText("+"));

    const botonAgregar = screen.getByRole("button", { name: /Añadir al Carrito/i, hidden: true });
    fireEvent.click(botonAgregar);

    await waitFor(() => {
      expect(agregarAlCarrito).toHaveBeenCalledWith(skuPrueba, 2);
      
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("éxito"));
      
      expect(mockHide).toHaveBeenCalled();
    });
  });
});