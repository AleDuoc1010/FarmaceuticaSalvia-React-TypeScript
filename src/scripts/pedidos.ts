import { pedidosApi } from "../api/axiosConfig";

export interface ItemPedido {
    id: number;
    sku: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface Pedido {
    id: number;
    uuid: string;
    montoTotal: number;
    estado: string;
    items: ItemPedido[];
}

export const getCarrito = async (): Promise<Pedido | null> => {
    try {
        const response = await pedidosApi.get<Pedido>("/pedidos/carrito");
        if (response.status === 204) return null;
        return response.data;
    } catch (error) {
        console.error("Error obteniendo Carrito", error);
        return null;
    }
};

export const pagarCarrito = async (): Promise<Pedido> => {
    const response = await pedidosApi.post<Pedido>("/pedidos/carrito/pagar");
    return response.data;
};

export const eliminarItemCarrito = async (sku: string): Promise<void> => {
    await pedidosApi.delete(`/pedidos/carrito/${sku}`);
};

export const getHistorial = async (): Promise<Pedido[]> => {
    const response = await pedidosApi.get<Pedido[]>("/pedidos/historial");
    return response.data;
};

export const agregarAlCarrito = async (sku: string, cantidad: number): Promise<Pedido> => {
    const response = await pedidosApi.post<Pedido>("/pedidos/carrito", {sku, cantidad});
    return response.data;
};

export const comprarDirecto = async (sku: string, cantidad: number): Promise<Pedido> => {
    const response = await pedidosApi.post<Pedido>("/pedidos/comprar", {sku, cantidad});
    return response.data;
};

export const actualizarCantidad = async (sku: string, cantidad: number): Promise<Pedido> => {
    const response = await pedidosApi.put<Pedido>(`/pedidos/carrito/${sku}?cantidad=${cantidad}`);
    return response.data;
};

export const vaciarCarrito = async (): Promise<void> => {
    await pedidosApi.delete("/pedidos/carrito");
};

export const eliminarPedidoHistorial = async (pedidoId: number): Promise<void> => {
    await pedidosApi.delete(`/pedidos/historial/${pedidoId}`);
};

export const borrarHistorial = async (): Promise<void> => {
    await pedidosApi.delete("/pedidos/historial");
};