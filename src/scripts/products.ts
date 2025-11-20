import { productoApi } from "../api/axiosConfig";

export interface Producto {
    id: number;
    sku: string;
    nombre: string;
    descripcion: string;
    precio: string;
    imagenUrl: string;
    destacado: boolean;
    pideReceta: boolean;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}

export const getAllProductos = async (page: number = 0): Promise<Page<Producto>> => {
    const response = await productoApi.get<Page<Producto>>(`/productos?page=${page}&size=20`);
    return response.data;
};

export const getDestacados = async (): Promise<Page<Producto>> => {
    const response = await productoApi.get<Page<Producto>>("/productos/destacados?page=0&size=6");
    return response.data
};

export const buscarProductos = async (nombre: string): Promise<Page<Producto>> => {
    const response = await productoApi.get<Page<Producto>>(`/productos/buscar?nombre=${nombre}`);
    return response.data;
};