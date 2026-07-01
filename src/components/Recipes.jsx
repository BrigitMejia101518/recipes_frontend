import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Recipes({ favorites = [], onToggleFavorite }) {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPages] = useState(1)

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch(`https://beyourchef.onrender.com/api/page=${page}`)
                if (!response.ok) throw new Error("No se pudo cargar la lista de recetas")
                const data = await response.json()
                setRecipes(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        load()
    }, [page])

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {recipes?.map((recipe) => {
                const isFavorite = favorites.includes(recipe._id);
                return (
                <li key={recipe._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <button 
                            onClick={() => onToggleFavorite(recipe._id)}
                            className="absolute top-4 right-4 text-xl focus:outline-none hover:scale-125 transition-transform z-10">
                            {isFavorite? '❤️' : '🤍'}
                    </button>
                    <div className="p-5">
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1"> 🍲🥗🍱 Recetas
                        </span>
                        <Link to={`/recipes/${recipe._id}`}
                        className="text-xl font-bold text-gray-800 hover:text-amber-500 block transition-colors mb-4">
                        {recipe.title}</Link>
                    </div>
                </li>
                )
            })}
        </ul>
    )
        
}

export {
    Recipes
}