const { Router } = require("express");
const {
  getMovies,
  getMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadPoster,
  getMovieByCinema,
  getShowingMovies,
  getFutureMovies,
  getMovieListByCinema,
} = require("../controllers/movie.controller");
const {
  uploadSingleImage,
} = require("../middlewares/uploads/uploadImage.middleware");
const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const { Movie } = require("./../models");

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/get_showing_movies", getShowingMovies);
movieRouter.get("/get_future_movies", getFutureMovies);
movieRouter.get("/get_movies_by_cinema/:id", getMovieByCinema);
movieRouter.post("/get_movies_by_cinema", getMovieListByCinema);
movieRouter.get("/:id", checkExist(Movie), getMovieDetail);

movieRouter.put("/:id", checkExist(Movie), updateMovie);

movieRouter.delete("/:id", checkExist(Movie), deleteMovie);
movieRouter.post(
  "/upload-poster/:id",
  checkExist(Movie),
  uploadSingleImage("movie_poster"),
  uploadPoster
);
movieRouter.post("/", createMovie);

module.exports = {
  movieRouter,
};
