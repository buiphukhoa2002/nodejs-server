const { PORT } = require("../app_config");
const { Cinema, CinemaRoom } = require("../models");

const getCinemas = async (req, res) => {
  try {
    const cinemaList = await Cinema.findAll();
    res.status(200).send(cinemaList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getCinemaDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaDetail = await Cinema.findOne({
      where: { id },
      include: [
        {
          model: CinemaRoom,
        },
      ],
    });
    res.status(200).send(cinemaDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createCinema = async (req, res) => {
  try {
    const { name, address, image, cinemaSystemId } = req.body;
    const newCinema = await Cinema.create({
      name,
      address,
      image,
      cinemaSystemId,
    });
    res.status(201).send(newCinema);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateCinema = async (req, res) => {
  try {
    const { name, address, image, cinemaSystemId } = req.body;
    const { id } = req.params;
    await Cinema.update(
      { name, address, image, cinemaSystemId },
      { where: { id } }
    );
    const cinemaDetail = await Cinema.findByPk(id);
    res.status(200).send(cinemaDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaDetail = await Cinema.findByPk(id);
    await Cinema.destroy({ where: { id } });
    res.status(200).send(cinemaDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadCinemaImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const urlImage = `http://localhost:${PORT}/` + file.path;
    const cinemaDetail = await Cinema.findByPk(id);
    cinemaDetail.image = urlImage;
    await cinemaDetail.save();
    res.status(200).send(cinemaDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getCinemas,
  getCinemaDetail,
  createCinema,
  updateCinema,
  deleteCinema,
  uploadCinemaImage,
};
