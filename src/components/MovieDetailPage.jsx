
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../MovieDetailPage.css'

export default function MovieDetailPage() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`);
          const data = await response.json();
          if (data.Response === "True") {
            setMovie(data);
          } else {
            setError("Movie not Found!");
          }
          setLoading(false);
        } catch (e) {
          setError("Error Fetching Movie Details!");
          setLoading(false);
        }
      };
      fetchMovieDetails();
    }, [imdbID]);
  
    return (
      <div className="movie-detail-container">
        {loading && <p className="loading">Loading movie Details...</p>}
        {error && <p className="error-message">{error}</p>}
        {movie && (
          <>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-info">
              <h2>{movie.Title} <span>({movie.Year})</span></h2>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <div className="movie-details">
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p className="rating"><strong>Rating:</strong> {movie.imdbRating}</p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  