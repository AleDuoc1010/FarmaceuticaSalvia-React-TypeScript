import { usuariosApi } from "../api/axiosConfig";

export interface UsuarioAdmin {
    uuid: string;
    nombre: string;
    email:string;
    phone:string;
    rol:string;
}

interface Page<T>{
    content: T[];
    totalPages: number;
    totalElements: number;
}

export const getAllUsuarios = async (page: number = 0): Promise<Page<UsuarioAdmin>> => {
    const response = await usuariosApi.get<Page<UsuarioAdmin>>(`/usuarios?page=${page}&size=10`);
    return response.data;
};

export const eliminarUsuario = async (uuid: string): Promise<void> => {
    await usuariosApi.delete(`/usuarios/${uuid}`);
};

export const actualizarRolUsuario = async (uuid: string, nuevoRol: string) => {
    const response = await usuariosApi.patch(`/usuarios/${uuid}/rol`, {
        nuevoRol: nuevoRol
    });
    return response.data;
}

export const esAdministrador = (): boolean => {
    const userStr = localStorage.getItem("usuario");
    if (!userStr) return false;
    try {
        const user = JSON.parse(userStr);
        return user.rol === "ADMINISTRADOR";
    } catch (e) {
        return false;
    }
};