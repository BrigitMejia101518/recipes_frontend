import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white border-b border-gray-100 shadow-sm py-4 px-6 flex justify-center items-center gap-6 sticky top-0 z-50">
                <NavLink to="/" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Inicio
                </NavLink>
                <span className="text-gray-300">|</span>
                
                <NavLink to="/recipes" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Recipes
                </NavLink>
                <span className="text-gray-300">|</span>
                <NavLink to="/favorites" className="text-sm font-semibold text-gray-600 hover:text-rose-500 transition-colors">
                    ❤️ Mis Favoritos
                </NavLink>
                <span className="text-gray-300">|</span>
                
                <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Acerca de
                </NavLink>
                <span className="text-gray-300">|</span>
                
                <NavLink to="/register" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Registrate
                </NavLink>
                <span className="text-gray-300">|</span>
                
                <NavLink to="/login" className="text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm shadow-amber-500/10">
                    Login
                </NavLink>
            </nav>

            <main className="flex-grow p-6">
                <Outlet />
            </main>
        </div>     
    );
}

export {
    Layout
}