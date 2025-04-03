import express from "express";
import {
  getMovies,
  getTrendingMovies,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", getMovies);

router.get("/movies/trending", getTrendingMovies);

export default router;
