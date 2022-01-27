const { Router } = require("express");
const { CinemaRoom } = require("../models");

const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const {
  getCinemaRooms,
  getCinemaRoomDetail,
  createCinemaRoom,
  updateCinemaRoom,
  deleteCinemaRoom,
} = require("../controllers/cinemaRoom.controller");

const cinemaRoomRouter = Router();

cinemaRoomRouter.get("/", getCinemaRooms);
cinemaRoomRouter.get("/:id", checkExist(CinemaRoom), getCinemaRoomDetail);
cinemaRoomRouter.post("/", createCinemaRoom);
cinemaRoomRouter.put("/:id", checkExist(CinemaRoom), updateCinemaRoom);
cinemaRoomRouter.delete("/:id", checkExist(CinemaRoom), deleteCinemaRoom);

module.exports = {
  cinemaRoomRouter,
};
