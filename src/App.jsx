import './App.css'
import NavBar from './components/Navbar'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import { MovieProvider } from "./contexts/MovieContext"
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie-details/:id" element={<Details />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
