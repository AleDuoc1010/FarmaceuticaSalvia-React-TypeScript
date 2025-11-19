import axios from "axios";

const URL_USUARIOS = 'http://localhost:8081';
const URL_PRODUCTO = 'http://localhost:8082';
const URL_INVENTARIO = 'http://localhost:8083';
const URL_PEDIDOS = 'http://localhost:8084';

export const usuariosApi = axios.create({
    baseURL: URL_USUARIOS,
});

export const productoApi = axios.create({
    baseURL: URL_PRODUCTO,
});

export const inventarioApi = axios.create({
    baseURL: URL_INVENTARIO,
});

export const pedidosApi = axios.create({
    baseURL: URL_PEDIDOS,
});

const authInterceptor = (config: any) => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

usuariosApi.interceptors.request.use(authInterceptor);
productoApi.interceptors.request.use(authInterceptor);
inventarioApi.interceptors.request.use(authInterceptor);
pedidosApi.interceptors.request.use(authInterceptor);