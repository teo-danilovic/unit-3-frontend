import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm';

import * as movieService from './services/movieService';
import { UserContext } from './contexts/UserContext';

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const moviesData = await movieService.index();
      setMovies(moviesData);
    };

    if (user) fetchAllMovies();
  }, [user]);

  const handleAddMovie = async (movieFormData) => {
    const newMovie = await movieService.create(movieFormData);
    setMovies([newMovie, ...movies]);
    navigate('/movies');
  };

  const handleDeleteMovie = async (movieId) => {
    const deletedMovie = await movieService.deleteMovie(movieId);
    setMovies(movies.filter((Movie) => Movie._id !== deletedMovie._id));
    navigate('/movies');
  };

  const handleUpdateMovie = async (movieId, movieFormData) => {
    const updatedMovie = await movieService.update(movieId, movieFormData);
    setMovies(movies.map((Movie) => (movieId === Movie._id ? updatedMovie : Movie)));
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      <NavBar />
      <h1>Hey there!</h1>

      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {!user && (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        {user && (
          <>
            <Route path='/movies' element={<MovieList movies={movies} />} />
            <Route path='/movies/new' element={<MovieForm handleAddMovie={handleAddMovie} />} />
            <Route path='/movies/:movieId' element={
              <MovieDetails handleDeleteMovie={handleDeleteMovie} />
            } />
            <Route path='/movies/:movieId/edit' element={
              <MovieForm handleUpdateMovie={handleUpdateMovie} />
            } />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

