const { Seat, Ticket } = require("../models");

const getSeats = async (req, res) => {
  try {
    const seatList = await Seat.findAll();
    res.status(200).send(seatList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getSeatsByShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const seatList = await Seat.findAll({
      include: [{ model: Ticket }],
      where: { showtimeId: id },
    });
    res.status(200).send(seatList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getSeatDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const seatDetail = await Seat.findByPk(id);
    res.status(200).send(seatDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createSeat = async (req, res) => {
  try {
    const { status, price, type, showtimeId } = req.body;

    const maxName = await Seat.max("name", { where: { showtimeId } });

    const newSeat = await Seat.create({
      name: maxName ? maxName + 1 : 1,
      status,
      price,
      type,
      showtimeId,
    });
    res.status(201).send(newSeat);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// (POST) domain/seat/:num
const createMultipleSeats = async (req, res) => {
  try {
    const { num } = req.params;
    const { status, price, type, showtimeId } = req.body;

    // Delete all seats of this showtime
    await Seat.destroy({ where: { showtimeId } });

    // Generate our new array
    const newSeats = new Array(num);
    for (let i = 1; i <= num; i++) {
      newSeats[i - 1] = {
        name: i,
        status,
        price,
        type,
        showtimeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    // Add new seats
    await Seat.bulkCreate(newSeats);

    const seatList = await Seat.findAll({ where: { showtimeId } });
    res.status(201).send(seatList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateSeat = async (req, res) => {
  try {
    const { name, status, price, type, showtimeId } = req.body;
    const { id } = req.params;
    await Seat.update(
      { name, status, price, type, showtimeId },
      { where: { id } }
    );
    const seatDetail = await Seat.findByPk(id);
    res.status(200).send(seatDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const seatDetail = await Seat.findByPk(id);
    await Seat.destroy({ where: { id } });
    res.status(200).send(seatDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getSeats,
  getSeatDetail,
  createSeat,
  updateSeat,
  deleteSeat,
  createMultipleSeats,
  getSeatsByShowtime,
};
