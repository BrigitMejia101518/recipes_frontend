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
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md mt-10">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Iniciar Sesión</h2>
                <div className="flex flex-col gap-1">
                    <label className="text-xl text-gray-700 font-medium">Email</label>
                    <input 
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={data.email}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:outline-purple-500 transition duration-200"
                    />
                    {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl text-gray-700 font-medium">Password</label>
                    <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={data.password}
                    className="rounded border border-gray-300 px-3 py-2 hover:border-purple-500 focus:outline-purple-500 transition duration-200"
                    />
                    {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
                </div>

                <button type="submit" className="rounded bg-purple-600 px-4 py-2 mt-4 font-semibold text-white hover:bg-purple-700 transition duration-300 cursor-pointer shadow-sm">Entrar</button>
                {res && <p className="text-sm text-center text-green-600 font-semibold mt-2">✅ Login correcto en Localhost</p>}
                {errors.api && <p className="text-sm text-center text-red-600 font-medium mt-2">❌{errors.api}</p>}
        </form>
    );
}

export {
    LoginForm
}

