import { Link } from "react-router-dom";
import { Characters } from "../components/Characters";


return (
    Characters.map((Characters) =>(
        <li key={Characters.id}>
            <Link to={`/characters/${Characters.id}`}>{Characters.name}</Link>
        </li>
    ))

)
