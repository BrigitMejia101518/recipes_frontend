import './App.css'
import { Routes, Route, NavLink, Outlet, } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Characters } from './components/Characters';
import { CharactersDetail } from './pages/CharactersDetail';
import { Layout } from './pages/Layout';
import { SearchField } from './components/Counter';
import { ThemeContext } from './context/ThemeCounter';
import { useState } from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  const [theme, setTheme] = useState("light")

  return (
    
      <ThemeContext value={{ theme, setTheme}}>
          <Routes>
              <Route path='register' element={<Register/>} />
              <Route path= 'login' element={<Login />} />
              <Route index element={<Home />} />
              <Route element={<ProtectedRoute />} >
                  <Route path='characters' element={<Characters />} />
                  <Route path='about' element={<About />} />
                  <Route path='characters/:id' element={<CharactersDetail />} />
                  <Route path='counter' element={<SearchField/>} />
                  <Route path='/' element={<Layout />}>
              </Route>
            
            </Route>
        </Routes>
      </ThemeContext>

  )
}
export default App;