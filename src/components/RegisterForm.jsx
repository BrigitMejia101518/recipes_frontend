import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
    const { login } = useAuth();
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
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) throw new Error("Error en el servidor al intentar crear el usuario");

            const datos = await response.json();
            setRes(datos);

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
            <h2 className="text-2xl font-black text-gray-800 text-center mb-2">Crear cuenta</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Nombre de usuario</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="userName"
                    value={data.userName}
                    disabled={isSubmitting}
                    className="rounded-xl border border-gray-200 px-3 py-2.5 hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors duration-200 disabled:opacity-50 text-sm"
                />
                {errors.name && <span className="text-xs text-red-500 font-medium mt-0.5">⚠️ {errors.name}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
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
                {isSubmitting ? "Creando cuenta..." : "Registrarme"}
            </button>

            {res && <p className="text-sm text-center text-green-600 font-semibold mt-2">Cuenta creada. Accediendo...</p>}
            {errors.api && <p className="text-xs text-center text-red-500 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-100 mt-2">❌ {errors.api}</p>}
        </form>
    );
}

export { RegisterForm };