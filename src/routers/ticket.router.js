const { Router } = require("express");
const { Ticket } = require("../models");

const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");
const {
  getTickets,
  getTicketDetail,
  createTicket,
  updateTicket,
  deleteTicket,
  createMultipleTickets,
  getTicketsByUser,
  printTicket,
  getTicketListByShowtimeAndUser,
  printTicket2,
} = require("../controllers/ticket.controller");

const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/get_tickets_by_user/:id", getTicketsByUser);
ticketRouter.get(
  "/get_ticket_list_by_user/:id",
  getTicketListByShowtimeAndUser
);
ticketRouter.get("/print_ticket/:id", printTicket);
ticketRouter.get("/:id", checkExist(Ticket), getTicketDetail);
ticketRouter.post("/", createTicket);
ticketRouter.post("/multiple", createMultipleTickets);
ticketRouter.post("/print_ticket/", printTicket2);
ticketRouter.put("/:id", checkExist(Ticket), updateTicket);
ticketRouter.delete("/:id", checkExist(Ticket), deleteTicket);

module.exports = {
  ticketRouter,
};
