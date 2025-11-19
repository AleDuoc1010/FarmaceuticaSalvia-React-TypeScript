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

// REGISTRAR USUARIO
export const register = async (data: RegisterData): Promise<any> => {
  const response = await usuariosApi.post("/usuarios/register", data);
  return response.data;
};

// INICIAR SESIÓN
export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await usuariosApi.post<LoginResponse>("/usuarios/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);

    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
  }

  return response.data;
};

// SESIÓN ACTIVA
export const sesionActiva = (): boolean => {
  return localStorage.getItem("token") !== null;
};

// CERRAR SESIÓN
export const Logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "/login";
};

// RECUPERAR CONTRASEÑA
export const recuperarClave = async (email: string): Promise<void> => {
  console.log("Funcionalidad no implementada en backend para: ", email);
  return Promise.resolve()
}