import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
              
                <div className="flex-shrink-0">
                  <NavLink to="/" className="text-xl font-black tracking-tight text-amber-600">
                    BeYourChef 🍳
                  </NavLink>
                </div>

                <div className="flex items-center gap-6">
                  <NavLink to="/" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Inicio
                  </NavLink>
                  
                  <NavLink to="/recipes" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Recetas
                  </NavLink>
                  
                  <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Acerca de
                  </NavLink>
                  
                  <span className="h-4 w-px bg-gray-200"></span>

                  <NavLink to="/register" className="text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors">
                    Regístrate
                  </NavLink>
                  
                  <NavLink to="/login" className="text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm shadow-amber-500/10">
                    Login
                  </NavLink>
                </div>

              </div>
            </div>
          </nav>

          <main className="flex-grow">
            <Outlet />
          </main>
        </div>
  );
}

export {
    Layout
}