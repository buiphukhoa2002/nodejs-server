const { Router } = require("express");
const { Cinema } = require("../models");

const {
  uploadSingleImage,
} = require("../middlewares/uploads/uploadImage.middleware");
const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const {
  getCinemas,
  getCinemaDetail,
  uploadCinemaImage,
  createCinema,
  updateCinema,
  deleteCinema,
} = require("../controllers/cinema.controller");

const cinemaRouter = Router();

cinemaRouter.get("/", getCinemas);
cinemaRouter.get("/:id", checkExist(Cinema), getCinemaDetail);
cinemaRouter.post(
  "/upload-image/:id",
  checkExist(Cinema),
  uploadSingleImage("cinema_image"),
  uploadCinemaImage
);
cinemaRouter.post("/", createCinema);
cinemaRouter.put("/:id", checkExist(Cinema), updateCinema);
cinemaRouter.delete("/:id", checkExist(Cinema), deleteCinema);

module.exports = {
  cinemaRouter,
};
