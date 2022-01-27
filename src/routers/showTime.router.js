const { Router } = require("express");
const { ShowTime } = require("../models");

const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const {
  getShowTimes,
  getShowTimeDetail,
  createShowTime,
  updateShowTime,
  deleteShowTime,
  fetchShowtime,
  fetchShowtimeByCinema,
} = require("../controllers/showtime.controller");

const showTimeRouter = Router();

showTimeRouter.post("/fetch", fetchShowtime);
showTimeRouter.post("/fetch_by_cinema", fetchShowtimeByCinema);
showTimeRouter.get("/", getShowTimes);
showTimeRouter.get("/:id", checkExist(ShowTime), getShowTimeDetail);
showTimeRouter.post("/", createShowTime);
showTimeRouter.put("/:id", checkExist(ShowTime), updateShowTime);
showTimeRouter.delete("/:id", checkExist(ShowTime), deleteShowTime);

module.exports = {
  showTimeRouter,
};
