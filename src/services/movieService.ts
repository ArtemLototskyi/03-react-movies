import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
    results: Movie[];
}

interface FetchMoviesParams {
    query: string;
    page?: number;
}

export const fetchMovies = async ({
    query,
    page = 1,
}: FetchMoviesParams): Promise<Movie[]> => {
    const response = await axios.get<MoviesResponse>(
        'https://api.themoviedb.org/3/search/movie',
        {
            params: {
                query,
                page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        }
    );

    return response.data.results;
};