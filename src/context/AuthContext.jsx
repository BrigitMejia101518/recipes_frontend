import { createContext, useState, useEffect } from "react";


const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);


    async function loadProfile(currentToken) {
        const activeToken = currentToken || token;

        if (!activeToken) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${activeToken}`
                }
            });

            if (!response.ok) throw new Error("Token inválido o caducado");

            const data = await response.json(); 
            setUser(data.user); 
        } catch (error) {
            console.error("Error al recuperar el perfil:", error.message);
            logout(); 
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error("El correo o la contraseña son incorrectos");

        const data = await response.json();

        localStorage.setItem("token", data.token);
        setToken(data.token);

        await loadProfile(data.token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setLoading(false);
    }

    useEffect(() => {
        loadProfile();
    }, []);

    const value = { user, token, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}