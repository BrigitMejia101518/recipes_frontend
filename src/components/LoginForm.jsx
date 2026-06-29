import { useState } from "react";




function validateLogin(data) {
    const errors = {};

    if(!data.email.trim()) {
        errors.email = "El correo electronico es obligatorio.";
    }

    if(data.password.trim()) {
        errors.password = "La contraseña es obligatoria.";
    }
    return errors;
}




function LoginForm() {

    const [data, setData] = useState({ email: "", password: "" });
    const [res, setRes] = useState(null);
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({...prev, [name]: value }));
        console.log(name, value);
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        console.log(name, value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const foundedErrors = validate(data);
        setErrors(foundedErrors);

        if(Object.keys(foundedErrors).length === 0) {
            sendLogin();
        }
    }


    async function sendLogin() {
        try {
            const response = await fetch('http://localhost:3000/api/user/Login', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Credenciales incorrectas o error n el servidor");

            const data = await response.json();
            setRes(data);

            setErrors({});
        } catch (error) {
            setErrors({ api: error.message });
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Iniciar Sesión</h2>
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

                <button type="submit">Entrar</button>
                {res && <p>Login correcto en Localhost</p>}
                {errors.api && <p>{errors.api}</p>}
            </div>
        </form>
    );
}

export {
    LoginForm
}

