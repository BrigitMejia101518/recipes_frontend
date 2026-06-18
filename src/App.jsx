import './App.css'
import { Routes, Route, NavLink, } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Characters } from './components/Characters';
import { Cards } from './components/Cards';
import { CharactersDetail } from './pages/CharactersDetail';


function App() {

  return (
    <div>
      <nav>
        <NavLink to="/">Inicio</ NavLink> | 
        <NavLink to="/characters">Recipes</ NavLink> | {" "}
        <NavLink to="/about">Acerca de</ NavLink>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/about' element={<About />} />
        <Route path='/characters/:id' element={<CharactersDetail />} />
      </Routes>

    </div>

  )
}
export default App;