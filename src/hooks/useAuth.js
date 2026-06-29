import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    const context = useContext(AuthContext);

    // Si un componente intenta usar este hook fuera del AuthProvider, le avisamos con un error claro
    if (!context) {
        throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
    }

    return context;
}