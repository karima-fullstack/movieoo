import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import previous from "../assets/previous.png";
import next from "../assets/next.png";

export default function Home() {
    const {
        searchQuery, setSearchQuery,
        movies, loading, error,
        page, setPage,
        handleSearch, resetHome
    } = useMovieContext();

    useEffect(() => {
      if (!searchQuery) {
          resetHome();
      } else {
          handleSearch(searchQuery, page); 
      }
    }, [searchQuery, page]);

    return (
        <div className="home">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <div className="movies-grid">
                    { movies && movies.length > 1 ? movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    )) 
                    : <h2>No movie with title "{searchQuery}"</h2>
                  }
                </div>
            )}

            <div className="nav-btns">
                <button disabled={page === 1} onClick={() => setPage(prev => Math.max(1, prev - 1))}>
                    <img src={previous} alt="Previous" />
                </button>
                <button disabled={page === 20} onClick={() => setPage(prev => Math.min(20, prev + 1))}>
                    <img src={next} alt="Next" />
                </button>
            </div>
        </div>
    );
}
