import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <div>
            <nav>
                <NavLink to="/">Inicio</ NavLink> | {" "}
                <NavLink to="/recipes">Recipes</ NavLink> | {" "}
                <NavLink to="/about">Acerca de</ NavLink> | {" "}
                <NavLink to="/register">Registrate</NavLink> | {" "}
                <NavLink to="/login">Login</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>     

        
    );
}


export {
    Layout
}