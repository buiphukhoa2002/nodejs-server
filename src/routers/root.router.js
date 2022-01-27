const { Router } = require("express");
const { authRouter } = require("./auth.router");
const { cinemaRoomRouter } = require("./cinemaRoom.router");
const { cinemaRouter } = require("./cinemaRouter");
const { cinemaSystemRouter } = require("./cinemaSystem.router");
const { movieRouter } = require("./movie.router");
const { seatRouter } = require("./seat.router");
const { showTimeRouter } = require("./showTime.router");
const { ticketRouter } = require("./ticket.router");
const { userRouter } = require("./user.router");

const rootRouter = Router();

// http://localhost:8000/api/v1/
rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/movie", movieRouter);
rootRouter.use("/cinema_system", cinemaSystemRouter);
rootRouter.use("/cinema", cinemaRouter);
rootRouter.use("/cinema_room", cinemaRoomRouter);
rootRouter.use("/showtime", showTimeRouter);
rootRouter.use("/seat", seatRouter);
rootRouter.use("/ticket", ticketRouter);

module.exports = {
  rootRouter,
};
