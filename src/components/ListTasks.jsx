import { useState } from "react";

const TAREAS = [
    { id: 1, texto: "Estudiar useState", hecha: true },
    { id: 2, texto: "Repasar props", hecha: true },
    { id: 3, texto: "Montar la lista filtrable", hecha: false },
    { id: 4, texto: "Desplegar el proyecto", hecha: false },
];

function ListTasks() {
    const []
    return (

        <ul>
            {
                TASKS.map7((task => (
                    <li key={task.id}>
                        {task.texto}
                        {task.hecha ? 'si' : 'no'}
                    </li>
                )))
            }
        </ul>
    )
}