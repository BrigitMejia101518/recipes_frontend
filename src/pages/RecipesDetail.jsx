import { useEffect, useState } from "react";
import { data, useParams, useNavigate, Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function RecipesDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch(`${API_URL}/recipes/${id}`);

                if (!response.ok) throw new Error("Receta no encontrada")
                const resData = await response.json()
                setRecipe(resData)
            }catch (error) {
                setError(error.message)
            }finally {
                setIsLoading(false)
            }
        }
        load() 
    }, [id])

    if (isLoading) {
            return <p className="text-center text-amber-600 font-semibold p-8 animate-pulse">Cargando deliciosas recetas...</p>;
    }

    if (error) {
            return <p className="text-center text-red-500 font-medium p-8">⚠️ Error: {error}</p>;
    }

    if (!recipe) return null;

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white shadow-sm rounded-3xl overflow-hidden border border-gray-100">
            <div className="p-6 pb-0">
                <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                    <span>←</span> Volver
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 pt-4">
                <div className="flex items-center justify-center">
                    <img src={recipe.image} alt={recipe.title}
                    className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xs border border-gray-100"/>
                </div>
                <div>
                    <div className="flex flex-col justify-center space-y-6">
                        <h2 className="font-bold text-3xl text-gray-800 pt-2 leading-tight">{recipe.title}</h2>
                        <div>
                            <h3 className="font-bold text-base text-amber-700 border-b border-gray-100 pb-2 mb-3">Ingredientes:</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                            
                            <h3 className="font-bold text-base text-amber-700 border-b border-gray-100 pb-2 mb-3 mt-6">Preparación:</h3>
                            <ul className="text-sm text-gray-600 leading-relaxed">
                                <li>{recipe.preparation}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {
    RecipesDetail
}