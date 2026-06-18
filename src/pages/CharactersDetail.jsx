import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";

function CharactersDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
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
        </div>
    )
}
export {
    CharactersDetail
}