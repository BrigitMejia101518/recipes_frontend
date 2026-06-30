import { useEffect, useState } from "react";
import { data, useParams, useNavigate, Navigate } from "react-router-dom";

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
                const response = await fetch(`http://localhost:3000/api/recipes/${id}`)

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

    if ( isLoading) return<p>Cargando.....</p>
    if (error) return<p>Error: {error}</p>

    return (
        <div className="max-w-4xl mx-auto my-8 bg-amber-50 shadow-md rounded-3xl overflow-hidden border border-amber-100">
            <div className="p-4">
                <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 text-amber-800 bg-amber-200/50 hover:bg-amber-200 rounded-xl transition-colors duration-200"
                >
                    <span>🔙</span> Volver
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 pt-2">
                <div className="flex items-center justify-center">
                    <img src={recipe.image} alt={recipe.title}
                    className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-sm"/>
                </div>
                <div>
                    <div className="flex flex-col justify-center space-y-6">
                        <h2 className="font-mono font-semibold text-3xl text-orange-600 text-center pt-4">{recipe.title}</h2>
                        <div>
                            <h3 className="font-mono font-semibold text-lg text-amber-900 border-b border-amber-200 pb-1 mb-2">Ingredientes:</h3>
                                <ul className="list-disc pl-5 font-mono text-sm text-stone-700 space-y-1">
                                    {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                                </ul>
                            <h3 className="gap-4 py-10 font-mono font-semibold text-lg text-amber-900 border-b border-amber-200 pb-1 mb-2">Preparación:</h3>
                                <ul>
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