import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/Login";
import { login } from "../scripts/forms";


vi.mock("../scripts/forms", () => ({
  login: vi.fn().mockResolvedValue({ token: "fake-token", usuario: {} }), 
  recuperarClave: vi.fn(),
}));

describe("Componente Login", () => {


    beforeEach(() => {
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });
    afterEach(() => {
        vi.clearAllMocks();
    });


  it("Renderiza correctamente el formulario de iniciar sesion", () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it("Muestra mensaje de error si los campos están vacios", async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
        expect(await screen.findByText(/El correo no puede estar vacío/i)).toBeInTheDocument();
        expect(await screen.findByText(/La contraseña no puede estar vacía/i)).toBeInTheDocument();
  });

  it("Muestra mensaje de error si el formato del correo no es valido", async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
        fireEvent.change(screen.getByLabelText(/Correo/i), {
            target: { value: "invalid-email" },
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
        expect(await screen.findByText(/El formato del correo no es válido/i)).toBeInTheDocument();
  })

  it("LLama a la funcion de login con los datos correctos", async () => {
    const onLoginSuccess = vi.fn();
    render(
        <MemoryRouter>
            <Login onLoginSuccess ={onLoginSuccess} />
        </MemoryRouter>
    );
        fireEvent.change(screen.getByLabelText(/Correo/i), {
            target: { value: "ale@gmail.com"},
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

        await waitFor(() => {
                expect(login).toHaveBeenCalledWith({ email: "ale@gmail.com", password: "password123" });
        
                expect(onLoginSuccess).toHaveBeenCalledWith();

                expect(window.alert).toHaveBeenCalledWith("Inicio de sesión exitoso.");
        });
  });
});
