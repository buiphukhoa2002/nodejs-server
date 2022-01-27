const { PORT } = require("../app_config");
const { Movie, ShowTime, CinemaRoom, Cinema, sequelize } = require("../models");
const dayjs = require("dayjs");

const getMovies = async (req, res) => {
  try {
    const movieList = await Movie.findAll();
    res.status(200).send(movieList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get movies that are currently in cinema
const getShowingMovies = async (req, res) => {
  try {
    const endDate = dayjs();
    const startDate = endDate.subtract(2, "week");
    const movieList = await Movie.findAll({
      where: [
        sequelize.where(
          sequelize.fn("date", sequelize.col("startDate")),
          ">=",
          startDate.toDate()
        ),
        sequelize.where(
          sequelize.fn("date", sequelize.col("startDate")),
          "<=",
          endDate.toDate()
        ),
      ],
    });
    res.status(200).send(movieList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get movies that will be shown in the future
const getFutureMovies = async (req, res) => {
  try {
    const startDate = dayjs();
    const movieList = await Movie.findAll({
      where: [
        sequelize.where(
          sequelize.fn("date", sequelize.col("startDate")),
          ">",
          startDate.toDate()
        ),
      ],
    });
    res.status(200).send(movieList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// old version (fetch only by cinema)
const getMovieByCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const movieList = await Movie.findAll({
      include: {
        model: ShowTime,
        required: true,
        include: {
          model: CinemaRoom,
          required: true,
          include: {
            model: Cinema,
            required: true,
            where: { id },
          },
        },
      },
    });
    res.status(200).send(movieList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// new version (fetch by cinema + date)
const getMovieListByCinema = async (req, res) => {
  try {
    let { cinemaId, date } = req.body;
    date = date ? dayjs(date) : dayjs();
    const movieList = await Movie.findAll({
      include: {
        model: ShowTime,
        required: true,
        where: [
          sequelize.where(
            sequelize.fn("day", sequelize.col("startTime")),
            "=",
            date.date()
          ),
          sequelize.where(
            sequelize.fn("month", sequelize.col("startTime")),
            "=",
            date.month() + 1
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("startTime")),
            "=",
            date.year()
          ),
        ],
        include: {
          model: CinemaRoom,
          required: true,
          include: {
            model: Cinema,
            required: true,
            where: { id: cinemaId },
          },
        },
      },
    });
    res.status(200).send(movieList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getMovieDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const movieDetail = await Movie.findByPk(id);
    res.status(200).send(movieDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      trailer,
      poster,
      duration,
      startDate,
      rating,
      director,
    } = req.body;
    const newMovie = await Movie.create({
      name,
      description,
      trailer,
      poster,
      duration,
      startDate,
      rating,
      director,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      trailer,
      poster,
      duration,
      startDate,
      rating,
      director,
    } = req.body;
    await Movie.update(
      {
        name,
        description,
        trailer,
        poster,
        duration,
        startDate,
        rating,
        director,
      },
      { where: { id } }
    );

    const movieDetail = await Movie.findByPk(id);
    res.status(200).send(movieDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movieDetail = await Movie.findByPk(id);
    await Movie.destroy({
      where: { id },
    });
    res.status(200).send(movieDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadPoster = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const imageUrl = `http://localhost:${PORT}/` + file.path;
    const movieDetail = await Movie.findByPk(id);
    movieDetail.poster = imageUrl;
    await movieDetail.save();
    res.status(200).send(movieDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
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
};
