import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;

function Favorites({ favorites = [], onToggleFavorite }) {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                setError(null)
                // Cargamos todas las recetas para poder filtrar cuáles son tus favoritas
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok) throw new Error("No se pudieron cargar las recetas")
                const data = await response.json()
                setRecipes(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        load();
    }, []);

    if (isLoading) {
        return <p className="text-center text-amber-600 font-semibold p-8 animate-pulse">Cargando tus favoritos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 font-medium p-8">⚠️ Error: {error}</p>;
    }

    // Filtramos para quedarnos SOLO con las recetas cuyos IDs estén en tus favoritos
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe._id));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
                ❤️ Mis Recetas Favoritas ({favoriteRecipes.length})
            </h2>

            {favoriteRecipes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 max-w-md mx-auto shadow-xs">
                    <p className="text-4xl mb-3">🤍</p>
                    <p className="text-gray-500 font-semibold mb-1">Tu lista está vacía</p>
                    <p className="text-xs text-gray-400">Explora la sección de recetas y marca tus preferidas con un corazón.</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {favoriteRecipes.map((recipe) => (
                        <li key={recipe._id}
                            className="relative bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="h-44 bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center text-4xl text-amber-600/60 relative select-none">
                                🍽️
                            </div>

                            {/* El botón sigue funcionando para quitarla de favoritos desde aquí */}
                            <button 
                                onClick={() => onToggleFavorite(recipe._id)}
                                className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs w-9 h-9 rounded-full shadow-xs text-base items-center justify-center flex cursor-pointer hover:scale-110 active:scale-95 transition-all z-10 border border-gray-100"
                            >
                                ❤️
                            </button>

                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div className="mb-4">
                                    <Link to={`/recipes/${recipe._id}`}
                                          className="text-xl font-bold text-gray-800 hover:text-amber-500 block transition-colors leading-snug line-clamp-2"
                                    >
                                        {recipe.title}
                                    </Link>
                                </div>

                                <div className="border-t border-gray-50 pt-4 mt-auto">
                                    <Link to={`/recipes/${recipe._id}`} 
                                        className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors text-center block"
                                    >
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export { Favorites }