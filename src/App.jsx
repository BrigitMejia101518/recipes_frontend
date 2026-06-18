import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Characters } from './pages/Characters';
import { Cards } from './components/Cards';

function App() {

  return (
    <div>
      <nav>
        <Link to="/">Inicio</ Link> | 
        <Link to="/Characters">Recipes</ Link> | {" "}
        <Link to="/About">Acerca de</ Link>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Characters' element={<Characters />} />
        <Route path='/About' element={<About />} />
      </Routes>

    </div>

  )
}
export default App;