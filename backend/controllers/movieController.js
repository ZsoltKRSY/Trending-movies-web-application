import fetch from "node-fetch";
import Metric from "../models/Metric.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export const getMovies = async (req, res) => {
  const searchQuery = req.query.query || "";

  try {
    let endPoint = searchQuery
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endPoint, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();

    if (searchQuery && data.results.length > 0) {
      await updateSearchCount(searchQuery, data.results[0]);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
};

export const getTrendingMovies = async (req, res) => {
  try {
    const movies = await Metric.findAll({
      limit: 5,
      order: [["count", "DESC"]],
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

const updateSearchCount = async (searchTerm, movie) => {
  try {
    const movieMetric = await Metric.findOne({
      where: { movie_id: movie.id },
    });

    if (movieMetric) {
      movieMetric.count++;
      await movieMetric.save();
    } else {
      await Metric.create({
        search_term: searchTerm,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
      });
    }
  } catch (error) {
    console.log(`Error updating metrics: ${error}`);
  }
};
