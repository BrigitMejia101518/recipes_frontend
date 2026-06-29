import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Characters() {
    const [Characters, setCharacters] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPages] = useState(1)

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch(`http://localhost:3000/api/recipe?page=${page}`)
                if (!response.ok) throw new Error("No se pudo cargar la receta")
                const data = await response.json()
                setCharacters(data.results)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        load()
    }, [page])

    return (
        <ul>
            {Characters?.map((character) => (
                <li key={character.id}>
                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                </li>
            ))}
        </ul>
    )
        
}

export {
    Characters
}