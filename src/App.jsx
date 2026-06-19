import './App.css'
import { Routes, Route, NavLink, Outlet, } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Characters } from './components/Characters';
import { Cards } from './components/Cards';
import { CharactersDetail } from './pages/CharactersDetail';
import { Layout } from './pages/Layout';


function App() {

  return (
    
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='characters' element={<Characters />} />
          <Route path='about' element={<About />} />
          <Route path='characters/:id' element={<CharactersDetail />} />
        </Route>
      </Routes>

  )
}
export default App;