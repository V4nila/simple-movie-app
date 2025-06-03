import { Link } from "react-router-dom";

export default function MovieCard({movie}){
    return (
        <div className="movie-card">
            <img src={movie.Poster} alt={movie.title} />
            <h3>{movie.Title} </h3>
            <Link to={`/movie/${movie.imdbID}`}><button>View Details</button></Link>

        </div>
    )

}