import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/Login";

describe("Login Component", () => {
  it("renders login form", () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it("shows error messages for empty fields", async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
        expect(await screen.findByText(/El correo no puede estar vacío/i)).toBeInTheDocument();
        expect(await screen.findByText(/La contraseña no puede estar vacía/i)).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
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
        expect(await screen.findByText(/Formato de correo electrónico inválido./i)).toBeInTheDocument();
  })

  it("calls login function with correct data", async () => {
    const onLoginSuccess = vi.fn().mockReturnValue(true);
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
        expect(onLoginSuccess).toHaveBeenCalledWith();
  });
});
