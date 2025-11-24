import { usuariosApi } from "../api/axiosConfig";

export interface RegisterData {
  nombre: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    uuid: string;
    nombre: string;
    email: string;
    rol: string;
  };
}

export const register = async (data: RegisterData): Promise<any> => {
  const response = await usuariosApi.post("/usuarios/register", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await usuariosApi.post<LoginResponse>("/usuarios/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);

    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
  }

  return response.data;
};

export const sesionActiva = (): boolean => {
  return localStorage.getItem("token") !== null;
};

export const Logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "/login";
};