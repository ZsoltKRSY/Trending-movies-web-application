import React from "react";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Trending Movies";
  }, []);

  useDebounce(
    () => {
      setdebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const loadMovies = async (query = "") => {
    try {
      setMoviesLoading(true);
      setErrorMessage("");

      const endPoint = query
        ? `http://localhost:5000/api/movies?query=${query}`
        : "http://localhost:5000/api/movies";
      const response = await fetch(endPoint);
      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setMoviesLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      setTrendingMoviesLoading(true);

      const response = await fetch("http://localhost:5000/api/movies/trending");
      const data = await response.json();

      if (data.response === "False") {
        console.error(data.Error || "Failed to fetch trending movies");
        setTrendingMovies([]);
      }

      setTrendingMovies(data);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    } finally {
      setTrendingMoviesLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero-banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMoviesLoading ? (
          <Spinner />
        ) : (
          trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.search_term} />
                  </li>
                ))}
              </ul>
            </section>
          )
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {moviesLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
