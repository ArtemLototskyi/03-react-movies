import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal'

import type { Movie } from './types/movie';
import { fetchMovies } from './services/movieService';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsError(false);
    setIsLoading(true);

      const data = await fetchMovies({
        query,
      });

      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
    setIsLoading(false);
  }
  };

   const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
   };
  
  const handleCloseModal = () => {
  setSelectedMovie(null);
};

  return (
    <>
    <Toaster position="top-right" />

    <SearchBar onSubmit={handleSearch} />

    {isLoading && <Loader />}

    {isError && <ErrorMessage />}

    {!isLoading && !isError && (
      <MovieGrid
        movies={movies}
        onSelect={handleSelectMovie}
      />
      )}
      {selectedMovie && (
      <MovieModal
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
      )}
  </>
  );
}
