import { Link } from "react-router-dom"
import { useMovieContext } from "../contexts/MovieContext";
import "../css/NavBar.css"

export default function NavBar() {

   const { resetHome } = useMovieContext();

   return <nav className="navbar">
      <div className="navbar-brand">
         <Link to="/">Movie App</Link>
      </div>
      <div className="nav-links">
         <Link to="/" className="nav-link" onClick={resetHome}>Home</Link>
         <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
   </nav>
}