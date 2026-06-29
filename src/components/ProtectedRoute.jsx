import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
    const { token, loading } = useAuth();

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-purple-600 font-semibold animate-pulse text-lg">Verificando credenciales..</p>
            </div>
        );
    }

    // Si hay token, pintamos las rutas de dentro (<Outlet />). Si no, rebotamos a la página de login.
    // El 'replace' evita que el usuario pueda volver atrás con las flechas del navegador a la página privada.
    return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export { ProtectedRoute };
