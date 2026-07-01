import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const { login, user } = useAuth();

    const navigate = useNavigate();

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

            navigate("/recipes");

        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-12">
            <h2 className="text-2xl font-black text-gray-800 text-center mb-2">Iniciar Sesión</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={data.email}
                    disabled={isSubmitting}
                    className="rounded-xl border border-gray-200 px-3 py-2.5 hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors duration-200 disabled:opacity-50 text-sm"
                />
                {errors.email && <span className="text-xs text-red-500 font-medium mt-0.5">⚠️ {errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Contraseña</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={data.password}
                    disabled={isSubmitting}
                    className="rounded-xl border border-gray-200 px-3 py-2.5 hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors duration-200 disabled:opacity-50 text-sm"
                />
                {errors.password && <span className="text-xs text-red-500 font-medium mt-0.5">⚠️ {errors.password}</span>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-amber-500 px-4 py-2.5 mt-4 font-bold text-white hover:bg-amber-600 transition-colors duration-200 cursor-pointer shadow-sm shadow-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                {isSubmitting ? "Comprobando..." : "Entrar"}
            </button>

            {user && <p className="text-sm text-center text-green-600 font-semibold mt-2">¡Bienvenido de nuevo! Sesión iniciada.</p>}
            {errors.api && <p className="text-xs text-center text-red-500 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-100 mt-2">❌ {errors.api}</p>}
        </form>
    );
}
export { LoginForm };