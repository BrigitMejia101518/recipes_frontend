import { useEffect, useState } from "react";
import { data, useParams, useNavigate, Navigate } from "react-router-dom";

function CharactersDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:3000/api/Recipe/${id}`)
                if (!response.ok) throw new Error("Receta no encontrada")
                const resData = await response.json()
                setCharacter(resData)
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
        <div>
            
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name}/>
            <p>Estado: {character.status}</p>
            <p>Especie: {character.species}</p>
            <button onClick={() => navigate(-1)}>🔙Volver</button>
        </div>
    )
}
export {
    CharactersDetail
}