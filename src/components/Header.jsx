import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
    const { token, logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();              // Borra el token y limpia el estado global
        navigate("/login"); // Redirige a la zona pública
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
            <Link to="/" className="text-xl font-bold text-purple-600">:shallow_pan_of_food: RecetasApp</Link>

            <div className="flex items-center gap-6 font-medium text-gray-600">
                <Link to="/" className="hover:text-purple-600 transition">Inicio</Link>

                {/* Renderizado condicional: si NO está logueado, ve esto */}
                {!token ? (
                    <>
                        <Link to="/login" className="hover:text-purple-600 transition">Login</Link>
                        <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">Registrate</Link>
                    </>
                ) : (
                    /* Renderizado condicional: si SÍ está logueado, ve esto */
                    <>
                        <Link to="/profile" className="hover:text-purple-600 transition">Mi Perfil</Link>
                        <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-200 font-semibold">
                            :bust_in_silhouette: {user?.userName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 font-semibold cursor-pointer transition"
                        >
                            Salir
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export { Header };