import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetailPage from './components/MovieDetailPage';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    const generateSeeds = async () => {
      const seedMovies = [];
      const exampleIDs = [
        'tt0848228', 
        'tt0110912', 
        'tt1375666', 
        'tt0137523', 
        'tt0167260', 
        'tt0133093', 
        'tt0076759', 
        'tt0109830', 
        'tt1853728',
        'tt0120737', 
        'tt0120815',
        'tt6751668',
        'tt0816692', 
        'tt0468569', 
        'tt4154796', 
        'tt0111161', 
        'tt0102926', 
        'tt0268978', 
        'tt0317248', 
        'tt2582802', 
      ];
  
      try {
        const responses = await Promise.all(
          exampleIDs.map((id) =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=${import.meta.env.VITE_API_KEY}`)
          )
        );
        const data = await Promise.all(responses.map((res) => res.json()));
        data.forEach((movie) => {
          if (movie.Response === 'True') {
            seedMovies.push(movie);
          }
        });
        setSeeds(seedMovies);
      } catch (error) {
        console.error('Error fetching seeds:', error);
      }
    };
  
    generateSeeds();
  }, []);
  
 

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
    setMovies([]);
  };

  return (
    <div>
      <nav>
        <h1 onClick={handleHomeClick}>Movie App</h1>
        <SearchBar onSearch={handleSearch} />
      </nav>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Routes>
        <Route
          path='/'
          element={<MovieList movies={movies.length > 0 ? movies : seeds} />}
        />
        <Route
          path='/movie/:imdbID'
          element={<MovieDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
