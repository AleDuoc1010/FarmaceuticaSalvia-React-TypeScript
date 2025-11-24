import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Register from "../pages/Register";
import { register } from "../scripts/forms";



vi.mock("../scripts/forms", () => ({
  register: vi.fn().mockResolvedValue({ success: true }),
}));

describe("Componente registro", () => {

    beforeEach(() => {
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });
    afterEach(() => {
        vi.clearAllMocks();
    });

  it("Muestra el formulario de registro", () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrarse/i })).toBeInTheDocument();
  });

  it("Muestra mensaje de error si los campos estan vacios", async () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
        fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
        expect(await screen.findByText(/El nombre no puede estar vacío/i)).toBeInTheDocument();
  });

  it("Muestra mensaje de error si el formato del correo es invalido", async () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
        fireEvent.change(screen.getByLabelText(/Nombre/i), {
            target: { value: "Stefania" },
        });
        fireEvent.change(screen.getByLabelText(/Correo/i), {
            target: { value: "correo-invalido" },
        });
        fireEvent.change(screen.getByLabelText(/Teléfono/i), {
            target: { value: "987654321" },
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
        expect(await screen.findByText(/El formato del correo no es válido/i)).toBeInTheDocument();
  })

  it("Ejecuta la funcion de registro con los datos correctos", async () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
        fireEvent.change(screen.getByLabelText(/Nombre/i), {
            target: { value: "Stefania" },
        });
        fireEvent.change(screen.getByLabelText(/Correo/i), {
            target: { value: "stefania@gmail.com" },
        });
        fireEvent.change(screen.getByLabelText(/Teléfono/i), {
            target: { value: "987654321" },
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith({
                nombre: "Stefania",
                email: "stefania@gmail.com",
                phone: "987654321",
                password: "password123",
            });

            expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Registro exitoso. Ahora puedes iniciar sesión"));
        });
  });
});
