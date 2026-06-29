import { Header } from "./Header";
import { ThemeSwitcher } from "./ThemeSwitcher";


function SearchField() {
    

    return (
        <div>
            <Header />
            <ThemeSwitcher />
        </div>
    )
}
    export {
        SearchField
    }









/*import { useContext } from "react";
import { ThemeContext } from "../context.jsx/ThemeCounter";


function SearchField() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Tema actual: {theme}

        </button>
    )
}
    export {
        SearchField
    }

*/



/*import { useRef,useEffect } from "react";

function SearchField() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <input ref={inputRef} placeholder="Escribe" />
    )
}


export { 
    SearchField
}*/