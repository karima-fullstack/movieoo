import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            const updatedFavorites = [...prev, movie];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => {
            const updatedFavorites = prev.filter(movie => movie.id !== movieId);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const isFavorite = (movieId) => favorites.some(movie => movie.id === movieId);


    const handleSearch = async (query, pageNum = 1) => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(query, pageNum);
            setMovies(searchResults);
            setSearchQuery(query);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    const resetHome = async () => {
        setSearchQuery("");
        setLoading(true);
        try {
            const popularMovies = await getPopularMovies(page);
            setMovies(popularMovies);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        searchQuery,
        setSearchQuery,
        movies,
        setMovies,
        page,
        setPage,
        loading,
        error,
        handleSearch,
        resetHome
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
