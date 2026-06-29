import { useState } from "react";
import { data } from "react-router-dom";


function validateRegister(data) {
    const errors = {};
    if(!data.username.trim()) {
        errors.username = "El nombre de usuario es obligatorio.";
    }

    if(!data.email.includes("@")) {
        errors.email = "El correo electronico no es valido.";
    }

    if(data.password.length < 6 ) {
        errors.password = "La contraseña debe tener minimo 6 caracteres.";
    }
    return errors;
}


function RegisterForm({ className}) {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [res, setRes] = useState(null);
    const [errors, setErrors] = useState({});


function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({...prev, [name]: value}));
}

function handleSubmit(e) {
    e.preventDefault();
    const errorsFound = validateRegister(data);
    setErrors(errorsFound);

    if(Object.keys(errorsFound).length === 0) {
        sendRegister();
    }

}


async function sendRegister() {
    try {
        const response = await fetch(`http://localhost:3000/api/user/Register`, {
            method: "POST",
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Error al enviar los datos de registro");

        const resultData = await response.json();
        setRes(resultData);
        setErrors({});
    } catch (error) {
        setErrors({ api: error.message });
    }
    
}


return (
    <form onSubmit={handleSubmit}>
        <div>
            <h2>Crear Cuenta</h2>
            <div>
                <label>Usarname</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    name="username"
                    value={data.username}
                />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Email</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={data.email}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={data.password}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <button type="submit">Enviar</button>
            {res && <p>Resgistro completado con exito en el Localhost</p>}
            {errors.api && <p>{errors.api}</p>}
        </div>
    </form>
);
}
export {
    RegisterForm
}