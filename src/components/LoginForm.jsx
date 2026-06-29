import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
    const { login, user } = useAuth();
    const [data, setData] = useState({ email: "", password: "" });
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
            handleLogin();
        }
    }

    function validate(data) {
        const errors = {};
        if (!data.email.trim()) errors.email = "El correo electrónico es obligatorio";
        if (!data.password.trim()) errors.password = "La contraseña es obligatoria";
        return errors;
    }

    async function handleLogin() {
        setIsSubmitting(true);
        setErrors({});
        try {
            await login(data.email, data.password);
        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        /* mx-auto centra el form, max-w-md le da anchura de tarjeta, shadow-md le da profundidad */
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Iniciar Sesión</h2>

            {/* Campo Email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={data.email}
                    disabled={isSubmitting}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:border-purple-500 focus:outline-none transition duration-200 disabled:opacity-50"
                />
                {errors.email && <span className="text-sm text-red-600 mt-0.5">{errors.email}</span>}
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
                {errors.password && <span className="text-sm text-red-600 mt-0.5">{errors.password}</span>}
            </div>

            {/* Botón dinámico con efecto hover y opacidad si está cargando */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-purple-600 px-4 py-2 mt-4 font-semibold text-white hover:bg-purple-700 transition duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Comprobando..." : "Entrar"}
            </button>

            {/* Feedback en pantalla */}
            {user && <p className="text-sm text-center text-green-600 font-semibold mt-2">:white_check_mark: ¡Bienvenido de nuevo! Sesión iniciada.</p>}
            {errors.api && <p className="text-sm text-center text-red-600 font-medium mt-2">:x: {errors.api}</p>}
        </form>
    );
}

export { LoginForm };