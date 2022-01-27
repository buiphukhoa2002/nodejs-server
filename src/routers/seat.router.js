const { Router } = require("express");
const { Seat, ShowTime } = require("../models");

const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const {
  getSeats,
  getSeatDetail,
  createSeat,
  updateSeat,
  deleteSeat,
  createMultipleSeats,
  getSeatsByShowtime,
} = require("../controllers/seat.controller");

const seatRouter = Router();

seatRouter.get("/", getSeats);
seatRouter.get(
  "/get-seats-by-showtime/:id",
  checkExist(ShowTime),
  getSeatsByShowtime
);
seatRouter.get("/:id", checkExist(Seat), getSeatDetail);
seatRouter.post("/", createSeat);
seatRouter.post("/:num", createMultipleSeats);
seatRouter.put("/:id", checkExist(Seat), updateSeat);
seatRouter.delete("/:id", checkExist(Seat), deleteSeat);

module.exports = {
  seatRouter,
};
