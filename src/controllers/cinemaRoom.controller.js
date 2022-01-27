const { CinemaRoom } = require("../models");

const getCinemaRooms = async (req, res) => {
  try {
    const cinemaRoomList = await CinemaRoom.findAll();
    res.status(200).send(cinemaRoomList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getCinemaRoomDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaRoomDetail = await CinemaRoom.findByPk(id);
    res.status(200).send(cinemaRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createCinemaRoom = async (req, res) => {
  try {
    const { name, type, cinemaId } = req.body;
    const newCinemaRoom = await CinemaRoom.create({
      name,
      type,
      cinemaId,
    });
    res.status(201).send(newCinemaRoom);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateCinemaRoom = async (req, res) => {
  try {
    const { name, type, cinemaId } = req.body;
    const { id } = req.params;
    await CinemaRoom.update({ name, type, cinemaId }, { where: { id } });
    const cinemaRoomDetail = await CinemaRoom.findByPk(id);
    res.status(200).send(cinemaRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteCinemaRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const cinemaRoomDetail = await CinemaRoom.findByPk(id);
    await CinemaRoom.destroy({ where: { id } });
    res.status(200).send(cinemaRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getCinemaRooms,
  getCinemaRoomDetail,
  createCinemaRoom,
  updateCinemaRoom,
  deleteCinemaRoom,
};
