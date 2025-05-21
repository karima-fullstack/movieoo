import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import { getMovieDetails } from '../services/api';
import "../css/Details.css"
import imdb from '../assets/imdb.png'

export default function Details() {
    const { id } = useParams();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const loadMovieDetails = async () => {
            try {
                const movie = await getMovieDetails(id);
                setMovieDetails(movie);
                console.log(movie);
            } catch (err) {
                console.log(err);
            }
        };

        loadMovieDetails();
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const favorite = isFavorite(movieDetails.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movieDetails.id);
        else addToFavorites(movieDetails);
    }

    return (
        <div className="movie-details">
            <div className="movie-poster-details">
                <img
                    src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : "fallback-image.jpg"}
                    alt={movieDetails.title}
                />
            </div>
            <div className="movie-details-info">
                <h3>{movieDetails.title}</h3>
                <h4>{movieDetails.release_date?.split("-")[0]}</h4>
                <div className="movie-rating">
                    <span>{movieDetails.vote_average.toFixed(1)} </span>
                    <img src={imdb} alt="imdb-icon" />
                </div>
                <button className={`movie-details-favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
                <p>{movieDetails.overview}</p>
                <div className='movie-genres'>
                    {
                        movieDetails.genres?.map((genre) => (
                            <span className='genre'>{genre.name}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
