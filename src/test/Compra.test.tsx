import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Compra } from "../modal/Compra";
import { comprarDirecto } from "../scripts/pedidos";
import { productoApi } from "../api/axiosConfig";

vi.mock("../scripts/pedidos", () => ({
  comprarDirecto: vi.fn(),
}));

vi.mock("../api/axiosConfig", () => ({
  productoApi: {
    get: vi.fn(),
  },
}));

describe("Componente Modal Compra", () => {
  const skuPrueba = "PAR-500";

  const mockProductoSimple = {
    data: {
      nombre: "Paracetamol Test",
      pideReceta: false,
      precio: 1000,
    },
  };

  const mockProductoReceta = {
    data: {
      nombre: "Antibiótico Fuerte",
      pideReceta: true,
      precio: 5000,
    },
  };

  let mockHide = vi.fn();

  beforeEach(() => {
    mockHide = vi.fn();
    vi.spyOn(window, "alert").mockImplementation(() => {});

    const mockModalInstance = {
      show: vi.fn(),
      hide: mockHide,
      dispose: vi.fn(),
    };

    (window as any).bootstrap = {
      Modal: vi.fn().mockImplementation(() => mockModalInstance),
    };

    (window as any).bootstrap.Modal.getInstance = vi
      .fn()
      .mockReturnValue(mockModalInstance);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza el formulario y carga la info del producto", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoSimple);

    render(<Compra productoSku={skuPrueba} />);

    expect(await screen.findByText(/Confirmar Compra: Paracetamol Test/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección de Entrega/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Método de Pago/i)).toBeInTheDocument();
    
    expect(screen.getByText("Pagar Total: $1000")).toBeInTheDocument();
  });

  it("Muestra errores de validación si se intenta pagar con campos vacíos", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoSimple);
    render(<Compra productoSku={skuPrueba} />);
    
    await screen.findByText(/Confirmar Compra:/i);

    const botonPagar = screen.getByText(/Pagar Total/i);
    fireEvent.click(botonPagar);

    expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("La dirección es obligatoria")).toBeInTheDocument();
    expect(screen.getByText("El teléfono es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("El método de pago es obligatorio")).toBeInTheDocument();

    expect(comprarDirecto).not.toHaveBeenCalled();
  });

  it("Actualiza el total al cambiar la cantidad", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoSimple);
    render(<Compra productoSku={skuPrueba} />);
    
    await screen.findByText(/Confirmar Compra:/i);

    const botonMas = screen.getByText("+");
    fireEvent.click(botonMas);
    fireEvent.click(botonMas);

    expect(screen.getByText("Pagar Total: $3000")).toBeInTheDocument();
  });

  it("Solicita receta médica si el producto lo requiere", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoReceta);
    render(<Compra productoSku={skuPrueba} />);

    await screen.findByText(/Confirmar Compra:/i);

    expect(screen.getByLabelText(/Sube tu Receta Médica/i)).toBeInTheDocument();

    const botonPagar = screen.getByText(/Pagar Total/i);
    expect(botonPagar).toBeDisabled();
  });

  it("Permite llenar el formulario y realizar la compra exitosa", async () => {
    (productoApi.get as any).mockResolvedValue(mockProductoSimple);
    (comprarDirecto as any).mockResolvedValue({ success: true });

    render(<Compra productoSku={skuPrueba} />);
    await screen.findByText(/Confirmar Compra:/i);

    const inputNombre = screen.getByLabelText(/Nombre Completo/i);
    fireEvent.change(inputNombre, { target: { value: "Juan Perez" } });

    const inputDireccion = screen.getByLabelText(/Dirección de Entrega/i);
    fireEvent.change(inputDireccion, { target: { value: "Calle Falsa 123" } });

    const inputTelefono = screen.getByLabelText(/Teléfono/i);
    fireEvent.change(inputTelefono, { target: { value: "987654321" } });

    const selectPago = screen.getByLabelText(/Método de Pago/i);
    fireEvent.change(selectPago, { target: { value: "contraEntrega" } });

    const botonPagar = screen.getByText(/Pagar Total/i);
    
    expect(botonPagar).not.toBeDisabled();
    
    fireEvent.click(botonPagar);

    await waitFor(() => {
      expect(comprarDirecto).toHaveBeenCalledWith(skuPrueba, 1);
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("éxito"));
      expect(mockHide).toHaveBeenCalled();
    });
  });
});