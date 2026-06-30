import { Link } from "react-router-dom";
import { Recipes } from "../components/Recipes";


return (
    Recipes.map((Recipes) =>(
        <li key={Recipes.id}>
            <Link to={`/recipes/${Recipes.id}`}>{Recipes.title}</Link>
        </li>
    ))

)
