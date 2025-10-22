interface Usuario {
  nombre: string;
  email: string;
  phone: string;
  password: string;
}

const usuariosKey = "usuarios";
const usuariosSession = "sesionUsuario";

// REGISTRAR USUARIO
export function register(usuario: Usuario): boolean {
  let usuarios: Usuario[] = [];

  // Leer usuarios existentes
  const data = localStorage.getItem(usuariosKey);
  if (data) {
    usuarios = JSON.parse(data);
    // Evitar registro duplicado
    if (usuarios.some((u) => u.email === usuario.email)) return false;
  }

  // Agregar nuevo usuario
  usuarios.push(usuario);
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
  return true;
}

// INICIAR SESIÓN
export function login(email: string, password: string): boolean {
  const data = localStorage.getItem(usuariosKey);
  if (!data) return false;

  const usuarios: Usuario[] = JSON.parse(data);
  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (usuario) {
    localStorage.setItem(usuariosSession, JSON.stringify(usuario));
    return true;
  }
  return false;
}

// SESIÓN ACTIVA
export function sesionActiva(): boolean {
  return localStorage.getItem(usuariosSession) !== null;
}

// CERRAR SESIÓN
export function Logout(): void {
  localStorage.removeItem(usuariosSession);
}

// RECUPERAR CONTRASEÑA
export function recuperarClave(email: string): string | null {
  const data = localStorage.getItem(usuariosKey);
  if (!data) return null;

  const usuarios: Usuario[] = JSON.parse(data);
  const usuario = usuarios.find((u) => u.email === email);
  return usuario ? usuario.password : null;
}
