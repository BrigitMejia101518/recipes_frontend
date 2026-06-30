import './App.css'
import { Routes, Route, NavLink, Outlet, } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Recipes } from './components/Recipes';
import { RecipesDetail } from './pages/RecipesDetail';
import { Layout } from './pages/Layout';
import { ThemeContext } from './context/ThemeCounter';
import { useState } from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  const [theme, setTheme] = useState("light")

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]); 
    }
  };

  return (
    
      <ThemeContext value={{ theme, setTheme}}>
          <Routes>
              <Route path='register' element={<Register/>} />
              <Route path= 'login' element={<Login />} />
              <Route index element={<Home />} />

              <Route element={<ProtectedRoute />} >
                  <Route path='/' element={<Layout />}>
                  <Route path='recipes' element={<Recipes favorites={favorites} onToggleFavorite={toggleFavorite} />} />
                  <Route path='recipes/:id' element={<RecipesDetail favorites={favorites} onToggleFavorite={toggleFavorite} />} />
                  <Route path='about' element={<About />} />
                  
              </Route>
            
            </Route>
        </Routes>
      </ThemeContext>

  )
}
export default App;