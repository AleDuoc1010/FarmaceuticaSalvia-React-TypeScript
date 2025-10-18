interface Usuario {
    nombre: string;
    email: string;
    phone: string;
    password: string;
}

const usuariosKey = "usuario";
const usuariosSession = "sesionUsuario";

export function register(usuario: Usuario): boolean {
    if (localStorage.getItem(usuariosKey)) return false;
    localStorage.setItem(usuariosKey, JSON.stringify(usuario));
    return true;
};

export function login(email: string, password: string): boolean {

    const user = localStorage.getItem(usuariosKey);
    if (!user) return false;
    const usuario = JSON.parse(user);
    if (usuario.email === email && usuario.password === password) {
        localStorage.setItem(usuariosSession, 'activo');
        return true;
    }
    return false;
};

export function sesionActiva(): boolean {
    return localStorage.getItem(usuariosSession) === 'activo';
}

export function Logout(): void {
    localStorage.removeItem(usuariosSession);
}

export function recuperarClave(): string | null {
    const user = localStorage.getItem(usuariosKey);
    if (!user) return null;
    return JSON.parse(user).password;
}