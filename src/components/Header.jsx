import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
    const { token, logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/Home"); 
    }

    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
            <Link to="/" className="text-xl font-black tracking-tight text-amber-600 flex items-center gap-2">
                🍳 BeYourChef
            </Link>
            <div className="flex items-center gap-6 font-semibold text-gray-600 text-sm">
                <Link to="/" className="hover:text-amber-500 transition-colors">Inicio</Link>

                {!token ? (
                    <>
                        <Link to="/login" className="hover:text-amber-500 transition-colors">Login</Link>
                        <Link to="/register" className="bg-amber-500 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/10">
                            Regístrate
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="hover:text-amber-500 transition-colors">Mi Perfil</Link>
                        <span className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 font-bold shadow-sm">
                            👤 {user?.userName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-600 font-bold cursor-pointer transition-colors bg-red-50 hover:bg-red-100/70 px-3 py-1.5 rounded-xl text-xs"
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