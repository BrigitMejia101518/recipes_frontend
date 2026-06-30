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

    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export { ProtectedRoute };
