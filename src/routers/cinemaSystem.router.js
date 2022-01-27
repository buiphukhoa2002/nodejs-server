const { Router } = require("express");
const { CinemaSystem } = require("../models");
const {
  getCinemaSystems,
  getCinemaSystemDetail,
  uploadCinemaSystemLogo,
  createCinemaSystem,
  updateCinemaSystem,
  deleteCinemaSystem,
} = require("../controllers/cinemaSystem.controller");
const {
  uploadSingleImage,
} = require("../middlewares/uploads/uploadImage.middleware");
const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");

const cinemaSystemRouter = Router();

cinemaSystemRouter.get("/", getCinemaSystems);
cinemaSystemRouter.get("/:id", checkExist(CinemaSystem), getCinemaSystemDetail);
cinemaSystemRouter.post(
  "/upload-logo/:id",
  uploadSingleImage("cinema_system_logo"),
  uploadCinemaSystemLogo
);
cinemaSystemRouter.post("/", createCinemaSystem);
cinemaSystemRouter.put("/:id", updateCinemaSystem);
cinemaSystemRouter.delete("/:id", deleteCinemaSystem);

module.exports = {
  cinemaSystemRouter,
};
