const { PORT } = require("../app_config");
const { CinemaSystem, Cinema, CinemaRoom, ShowTime } = require("../models");

const getCinemaSystems = async (req, res) => {
  try {
    const cinemaSystemList = await CinemaSystem.findAll();
    res.status(200).send(cinemaSystemList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getCinemaSystemDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaSystemDetail = await CinemaSystem.findOne({
      where: { id },
      include: [
        {
          model: Cinema,
        },
      ],
    });
    res.status(200).send(cinemaSystemDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createCinemaSystem = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const newCinemaSystem = await CinemaSystem.create({ name, logo });
    res.status(201).send(newCinemaSystem);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateCinemaSystem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo } = req.body;
    await CinemaSystem.update({ name, logo }, { where: { id } });
    const cinemaSystemDetail = await CinemaSystem.findByPk(id);
    res.status(200).send(cinemaSystemDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteCinemaSystem = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaSystemDetail = await CinemaSystem.findByPk(id);
    await CinemaSystem.destroy({ where: { id } });
    res.status(200).send(cinemaSystemDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadCinemaSystemLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const urlImage = `http://localhost:${PORT}/` + file.path;
    const cinemaSystemDetail = await CinemaSystem.findByPk(id);
    cinemaSystemDetail.logo = urlImage;
    await cinemaSystemDetail.save();
    res.status(200).send(cinemaSystemDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getCinemaSystems,
  getCinemaSystemDetail,
  createCinemaSystem,
  updateCinemaSystem,
  deleteCinemaSystem,
  uploadCinemaSystemLogo,
};
