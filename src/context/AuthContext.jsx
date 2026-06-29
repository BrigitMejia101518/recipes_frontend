import { createContext, useState, useEffect } from "react";

// Leemos la URL de localhost que acabamos de configurar en el .env
const API_URL = import.meta.env.VITE_API_URL;

// 1. Creamos el almacén flotante (el contexto)
export const AuthContext = createContext(null);

// 2. Creamos el componente proveedor que envolverá a toda la aplicación
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Recuperamos el token de localStorage al arrancar la app (si es que existe)
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // PASO A: Cargar el perfil del usuario usando el Token
    async function loadProfile(currentToken) {
        const activeToken = currentToken || token;

        // Si no hay ningún token guardado, dejamos de cargar y salimos
        if (!activeToken) {
            setLoading(false);
            return;
        }

        try {
            // Llamamos a la ruta protegida de tu backend de M2
            // :warning: IMPORTANTE: Asegúrate de que tu ruta de perfil en el back sea exactamente esta
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: "GET",
                headers: {
                    // Enviamos el JWT con el formato estándar exigido por el middleware
                    "Authorization": `Bearer ${activeToken}`
                }
            });

            if (!response.ok) throw new Error("Token inválido o caducado");

            const data = await response.json(); // Tu back responderá con { user } o similar
            setUser(data.user); // Guardamos los datos del usuario en el estado global
        } catch (error) {
            console.error("Error al recuperar el perfil:", error.message);
            logout(); // Si el token está corrupto o caducado, limpiamos la sesión
        } finally {
            setLoading(false);
        }
    }

    // PASO B: Iniciar Sesión (El flujo real en 2 pasos)
    async function login(email, password) {
        // 1. Mandamos las credenciales a la ruta de login de tu Express
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Recuerda: fetch NO lanza error solo si el servidor responde con 400 o 401. Lo forzamos nosotros:
        if (!response.ok) throw new Error("El correo o la contraseña son incorrectos");

        const data = await response.json(); // El backend nos devuelve el objeto con el { token }

        // 2. Guardamos el token tanto en el disco del navegador como en el estado de React
        localStorage.setItem("token", data.token);
        setToken(data.token);

        // 3. Con ese token recién obtenido, llamamos inmediatamente a rescatar su perfil
        await loadProfile(data.token);
    }

    // PASO C: Cerrar Sesión
    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setLoading(false);
    }

    // Efecto que se ejecuta una sola vez cuando la alumna enciende la web.
    // Si ya estaba logueada ayer, va a buscar su perfil automáticamente.
    useEffect(() => {
        loadProfile();
    }, []);

    // Empaquetamos todo lo que queremos que los formularios de Login y Register puedan usar
    const value = { user, token, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}