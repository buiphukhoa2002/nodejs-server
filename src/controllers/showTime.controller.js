const {
  ShowTime,
  Movie,
  CinemaRoom,
  Cinema,
  CinemaSystem,
  sequelize,
} = require("../models");
const dayjs = require("dayjs");

const getShowTimes = async (req, res) => {
  try {
    const showTimeList = await ShowTime.findAll({
      include: [
        { model: Movie },
        {
          model: CinemaRoom,
          include: { model: Cinema },
        },
      ],
    });

    // const [showTime, metadata] = await sequelize.query(
    //   `SELECT
    //   s.id, s.startTime, s.cinemaRoomId, s.movieId,
    //   cr.id AS 'cr_id', cr.name AS 'cr_name', cr.type AS 'cr_type', cr.cinemaId AS 'cr_cinemaId',
    //   m.id AS 'm_id', m.name AS 'm_name', m.description AS 'm_description', m.trailer AS 'm_trailer', m.poster AS 'm_poster', m.duration AS 'm_duration', m.startDate AS 'm_startDate', m.rating AS 'm_rating', m.director AS 'm_director',
    //   c.id AS 'c_id', c.name AS 'c_name', c.image AS 'c_image', c.address AS 'c_address', c.cinemaSystemId AS 'c_cinemaSystemId'
    //   FROM showtimes AS s
    //   LEFT JOIN cinemarooms AS cr
    //   ON s.cinemaRoomId = cr.id
    //   LEFT JOIN movies AS m
    //   ON s.movieId = m.id
    //   LEFT JOIN cinemas AS c
    //   ON cr.cinemaId = c.id`
    // );

    // let showTimeList = new Array(showTime.length);
    // for (let i in showTime) {
    //   const {
    //     id,
    //     startTime,
    //     cinemaRoomId,
    //     movieId,
    //     cr_id,
    //     cr_name,
    //     cr_type,
    //     cr_cinemaId,
    //     m_id,
    //     m_name,
    //     m_description,
    //     m_trailer,
    //     m_poster,
    //     m_duration,
    //     m_startDate,
    //     m_rating,
    //     m_director,
    //     c_id,
    //     c_name,
    //     c_image,
    //     c_address,
    //     c_cinemaSystemId,
    //   } = showTime[i];
    //   showTimeList[i] = {
    //     id,
    //     startTime,
    //     cinemaRoomId,
    //     movieId,
    //     Movie: {
    //       id: m_id,
    //       name: m_name,
    //       description: m_description,
    //       trailer: m_trailer,
    //       poster: m_poster,
    //       duration: m_duration,
    //       startDate: m_startDate,
    //       rating: m_rating,
    //       director: m_director,
    //     },
    //     CinemaRoom: {
    //       id: cr_id,
    //       name: cr_name,
    //       type: cr_type,
    //       cinemaId: cr_cinemaId,
    //     },
    //     Cinema: {
    //       id: c_id,
    //       name: c_name,
    //       image: c_image,
    //       address: c_address,
    //       cinemaSystemId: c_cinemaSystemId,
    //     },
    //   };
    // }
    res.status(200).send(showTimeList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getShowTimeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const showTimeDetail = await ShowTime.findOne({
      include: [
        {
          model: Movie,
        },
        {
          model: CinemaRoom,
          include: {
            model: Cinema,
          },
        },
      ],
      where: { id },
    });
    res.status(200).send(showTimeDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createShowTime = async (req, res) => {
  try {
    const { startTime, cinemaRoomId, movieId } = req.body;
    const newShowTime = await ShowTime.create({
      startTime,
      cinemaRoomId,
      movieId,
    });
    res.status(201).send(newShowTime);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateShowTime = async (req, res) => {
  try {
    const { startTime, cinemaRoomId, movieId } = req.body;
    const { id } = req.params;
    await ShowTime.update(
      { startTime, cinemaRoomId, movieId },
      { where: { id } }
    );
    const showTimeDetail = await ShowTime.findByPk(id);
    res.status(200).send(showTimeDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteShowTime = async (req, res) => {
  try {
    const { id } = req.params;
    const showTimeDetail = await ShowTime.findByPk(id);
    await ShowTime.destroy({ where: { id } });
    res.status(200).send(showTimeDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Fetch showtime by movie, cinema system and date
const fetchShowtime = async (req, res) => {
  try {
    const { movieId, date, cinemaSystemId } = req.body;
    const fullDate = dayjs(date);
    const showtimeList = await CinemaSystem.findOne({
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
          required: true,
          include: {
            model: CinemaRoom,
            attributes: ["id"],
            required: true,
            include: {
              model: ShowTime,
              attributes: ["id", "startTime"],
              required: true,
              where: [
                {
                  movieId,
                },
                sequelize.where(
                  sequelize.fn("day", sequelize.col("startTime")),
                  "=",
                  fullDate.date()
                ),
                sequelize.where(
                  sequelize.fn("month", sequelize.col("startTime")),
                  "=",
                  fullDate.month() + 1
                ),
                sequelize.where(
                  sequelize.fn("year", sequelize.col("startTime")),
                  "=",
                  fullDate.year()
                ),
              ],
            },
          },
        },
      ],
      attributes: [],
      where: { id: cinemaSystemId },
    });
    res.status(200).send(showtimeList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Fetch showtime by movie, cinema and date
const fetchShowtimeByCinema = async (req, res) => {
  try {
    const { movieId, date, cinemaId } = req.body;
    const fullDate = dayjs(date);
    const showtimeList = await Cinema.findOne({
      include: [
        {
          model: CinemaRoom,
          attributes: ["id"],
          required: true,
          include: {
            model: ShowTime,
            attributes: ["id", "startTime"],
            required: true,
            where: [
              {
                movieId,
              },
              sequelize.where(
                sequelize.fn("day", sequelize.col("startTime")),
                "=",
                fullDate.date()
              ),
              sequelize.where(
                sequelize.fn("month", sequelize.col("startTime")),
                "=",
                fullDate.month() + 1
              ),
              sequelize.where(
                sequelize.fn("year", sequelize.col("startTime")),
                "=",
                fullDate.year()
              ),
            ],
          },
        },
      ],
      attributes: ["id"],
      where: { id: cinemaId },
    });
    res.status(200).send(showtimeList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getShowTimes,
  getShowTimeDetail,
  createShowTime,
  updateShowTime,
  deleteShowTime,
  fetchShowtime,
  fetchShowtimeByCinema,
};
