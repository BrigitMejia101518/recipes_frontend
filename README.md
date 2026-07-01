# 🍳 BeYourChef - Plataforma de Recetas Gourmet

¡Bienvenido a **BeYourChef**! Una aplicación web moderna e interactiva diseñada para amantes de la cocina, donde los usuarios pueden explorar recetas detalladas, gestionar sus platos favoritos en tiempo real y registrarse para acceder a una experiencia personalizada de cocina.

Este proyecto ha sido desarrollado en **React** utilizando **Vite** como empaquetador y **Tailwind CSS** para un diseño visual de alta fidelidad, limpio y responsivo.

---

## 🚀 Características Principales

* **Autenticación Completa de Usuarios:** Sistema seguro de Registro e Iniciar Sesión conectado mediante API con manejo de tokens.
* **Catálogo Dinámico de Recetas:** Vista principal con tarjetas estilizadas que muestran el menú gastronómico disponible.
* **Detalle Gourmet Avanzado:** Páginas dedicadas por receta que cargan dinámicamente ingredientes ordenados y metodologías de preparación legibles.
* **Gestión de Favoritos en Tiempo Real:** Sistema interactivo que permite guardar o quitar platos favoritos mediante un solo clic (corazón interactivo ❤️/🤍).
* **Sección de Favoritos Exclusiva:** Ruta dedicada `/favorites` para visualizar instantáneamente únicamente los platos guardados por el usuario.
* **Navegación Fluida:** Rutas dinámicas y diseño persistente gestionado mediante `react-router-dom`.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

* **Frontend Core:** React 18+ (Hooks: `useState`, `useEffect`, `useParams`, `useNavigate`).
* **Enrutamiento:** `react-router-dom` (Estructura basada en Layouts y Outlets).
* **Estilos y Diseño:** Tailwind CSS (Arquitectura basada en utilidades, diseño responsivo y efectos fluidos hover/active).
* **Entorno de Desarrollo:** Vite.
* **Conexión API:** Fetch de JavaScript asíncrono (`async/await`) configurado mediante variables de entorno (`.env`).

---

## 📂 Estructura del Proyecto (Arquitectura del Código)

El diseño del código respeta las buenas prácticas de React separando la lógica visual de las vistas lógicas principales:


src/
  ├── components/
  │    ├── Header.jsx       -> Barra de navegación superior
  │    ├── LoginForm.jsx    -> Formulario de inicio de sesión
  │    └── RegisterForm.jsx -> Formulario de registro con validaciones
  │
  ├── pages/
  │    ├── Home.jsx         -> Pantalla de bienvenida / Landing
  │    ├── Recipes.jsx      -> Catálogo completo de recetas
  │    ├── RecipesDetail.jsx-> Vista de ingredientes y preparación
  │    ├── Favorites.jsx    -> Sección de platos favoritos
  │    ├── Login.jsx        -> Página contenedora de Login
  │    └── Register.jsx     -> Página contenedora de Registro
  │
  ├── hooks/
  │    └── useAuth.js       -> Manejo global de la autenticación
  │
  ├── App.jsx               -> Enrutador principal y estados globales
  └── main.jsx              -> Punto de entrada de la aplicación React

---
## ⚙️ Instalación y Configuración Local

Sigue estos pasos para arrancar el entorno de desarrollo local:

### 1. Clonar el repositorio:

Bash
git clone <url-de-tu-repositorio>
cd beyourchef-frontend



### 2. Instalar las dependencias de Node:

Bash
npm install



### 3. Configurar las Variables de Entorno:
Crea un archivo .env en la raíz del proyecto y añade la URL de tu API del servidor:
Fragmento de código
## VITE_API_URL=http://localhost:5173/api

(``Asegúrate de cambiar este puerto o URL por la correspondiente a la de tu servidor backend``).



### 4. Ejecutar la aplicación en modo desarrollo:

Bash
npm run dev


