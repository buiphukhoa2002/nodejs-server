const {
  Ticket,
  Seat,
  ShowTime,
  CinemaRoom,
  Cinema,
  Movie,
  User,
} = require("../models");
const buildPDF = require("../utils/buildPDF");
const pdf = require("html-pdf");
const pdfTemplate = require("./../utils/PDFgenerator");
const path = require("path");

const getTickets = async (req, res) => {
  try {
    const ticketList = await Ticket.findAll();
    res.status(200).send(ticketList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketList = await Ticket.findAll({
      include: [
        {
          model: Seat,
          include: {
            model: ShowTime,
            include: [
              {
                model: CinemaRoom,
                include: {
                  model: Cinema,
                },
              },
              {
                model: Movie,
              },
            ],
          },
        },
      ],
      where: { userId: id },
    });
    res.status(200).send(ticketList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getTicketListByShowtimeAndUser = async (req, res) => {
  try {
    const { id } = req.params; // user id
    const ticketList = await ShowTime.findAll({
      include: [
        {
          model: CinemaRoom,
          include: {
            model: Cinema,
          },
        },
        {
          model: Seat,
          required: true,
          include: {
            model: Ticket,
            where: { userId: id },
          },
        },
        {
          model: Movie,
        },
      ],
    });
    res.status(200).send(ticketList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getTicketDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketDetail = await Ticket.findByPk(id);
    res.status(200).send(ticketDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createTicket = async (req, res) => {
  try {
    const { userId, seatId } = req.body;
    const newTicket = await Ticket.create({
      userId,
      seatId,
    });
    res.status(201).send(newTicket);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createMultipleTickets = async (req, res) => {
  try {
    const { seatList, userId } = req.body;
    const newTickets = seatList.map((seat) => ({
      seatId: seat,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Set booked seats as unavailable
    for (let seatId of seatList) {
      await Seat.update({ status: true }, { where: { id: seatId } });
    }

    await Ticket.bulkCreate(newTickets);
    res.status(201).send(newTickets);
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (req, res) => {
  try {
    const { userId, seatId } = req.body;
    const { id } = req.params;
    await Ticket.update({ userId, seatId }, { where: { id } });
    const ticketDetail = await Ticket.findByPk(id);
    res.status(200).send(ticketDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketDetail = await Ticket.findByPk(id);
    await Ticket.destroy({ where: { id } });
    res.status(200).send(ticketDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const printTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Seat,
          include: {
            model: ShowTime,
            include: [
              { model: Movie },
              { model: CinemaRoom, include: { model: Cinema } },
            ],
          },
        },
      ],
    });

    const fileName = `public/docs/${Date.now()}_ticket.pdf`;
    // const stream = res.writeHead(200, {
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": "attachment;filename=ticket.pdf",
    // });
    buildPDF(
      ticket,
      fileName
      // (chunk) => stream.write(chunk),
      // () => stream.end()
    );

    res.status(200).send("http://localhost:8000/" + fileName);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const printTicket2 = async (req, res) => {
  try {
    const { userId, showtimeId } = req.body;
    const ticket = await ShowTime.findOne({
      where: { id: showtimeId },
      include: [
        {
          model: CinemaRoom,
          include: {
            model: Cinema,
          },
        },
        {
          model: Seat,
          required: true,
          include: {
            model: Ticket,
            where: { userId },
          },
        },
        {
          model: Movie,
        },
      ],
    });

    const fileName = Date.now();

    pdf
      .create(pdfTemplate(ticket), {})
      .toFile(`./public/docs/${fileName}.pdf`, (err) => {
        if (err) {
          res.status(500).send({ message: "Error" });
        }
        res
          .status(200)
          .sendFile(path.join(__dirname, `../../public/docs/${fileName}.pdf`));
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getTickets,
  getTicketDetail,
  getTicketsByUser,
  getTicketListByShowtimeAndUser,
  createTicket,
  createMultipleTickets,
  updateTicket,
  deleteTicket,
  printTicket,
  printTicket2,
};
