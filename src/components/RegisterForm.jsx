import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
// 1. Importamos useNavigate para la redirección automática
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
    const { login } = useAuth();
    // 2. Inicializamos el hook de navegación
    const navigate = useNavigate();

    const [data, setData] = useState({ userName: "", email: "", password: "" });
    const [res, setRes] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const foundedErrors = validate(data);
        setErrors(foundedErrors);

        if (Object.keys(foundedErrors).length === 0) {
            sendRegister();
        }
    }

    function validate(data) {
        const errors = {};
        if (!data.userName.trim()) errors.name = "El nombre de usuario es obligatorio";
        if (data.userName.trim().length > 20) errors.name = "El nombre de usuario no puede tener más de 20 caracteres";
        if (!data.email.includes("@")) errors.email = "Email no válido";
        if (data.password.length < 6) errors.password = "La contraseña debe tener más de 6 caracteres";
        return errors;
    }

    async function sendRegister() {
        setIsSubmitting(true);
        setErrors({});
        try {
            // Ajustado a la ruta real de vuestro backend que dio pase correcto
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Error en el servidor al intentar crear el usuario");

            const datos = await response.json();
            setRes(datos);

            // Auto-Login automático al registrarse
            await login(data.email, data.password);

            // :star2: LA REDIRECCIÓN:
            // En cuanto el login guarda el token, la mandamos directa dentro de la app
            navigate("/characters");

        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Crear cuenta</h2>

            {/* Campo Username */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nombre de usuario</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="userName"
                    value={data.userName}
                    disabled={isSubmitting}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:border-purple-500 focus:outline-none transition duration-200 disabled:opacity-50"
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
            </div>

            {/* Campo Email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={data.email}
                    disabled={isSubmitting}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:border-purple-500 focus:outline-none transition duration-200 disabled:opacity-50"
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
            </div>

            {/* Campo Password */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={data.password}
                    disabled={isSubmitting}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:border-purple-500 focus:outline-none transition duration-200 disabled:opacity-50"
                />
                {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-purple-600 px-4 py-2 mt-4 font-semibold text-white hover:bg-purple-700 transition duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Creando cuenta..." : "Registrarme"}
            </button>

            {res && <p className="text-sm text-center text-green-600 font-semibold mt-2">Cuenta creada. Acceding...</p>}
            {errors.api && <p className="text-sm text-center text-red-600 font-medium mt-2">{errors.api}</p>}
        </form>
    );
}

export { RegisterForm };