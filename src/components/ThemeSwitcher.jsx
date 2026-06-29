import { useContext } from "react";
import { ThemeContext } from "../context/ThemeCounter";

function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Cambiar a { theme === "light" ? "dark" : "light"}

        </button>
    )
}

export {
    ThemeSwitcher
}