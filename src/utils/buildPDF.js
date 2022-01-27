const PDFDocument = require("pdfkit");
const dayjs = require("dayjs");
const fs = require("fs");

const buildPDF = (ticket, fileName) => {
  const { User, Seat } = ticket;
  const { ShowTime } = Seat;
  const { Movie, CinemaRoom } = ShowTime;
  const { Cinema } = CinemaRoom;

  const doc = new PDFDocument();
  //   doc.on("data", dataCallback);
  //   doc.on("end", endCallback);

  doc.pipe(fs.createWriteStream(fileName));

  doc.fillColor("green").fontSize(25).text("RainFilms' ticket", {
    align: "center",
  });
  doc.fillColor("black").fontSize(25).text(" ");
  doc.fontSize(20).text(`Ticket's id: ${ticket.id}`);
  doc.text("---------------------------------------------------------");
  doc.fontSize(15).text("Customer information:");
  doc.text(`    Name: ${User.name}`);
  doc.text(`    Email: ${User.email}`);
  doc.text(`Movie: ${Movie.name}`);
  doc.text(
    `Date & Time: ${dayjs(ShowTime.startTime).format("HH:mm DD/MM/YYYY")}`
  );
  doc.text(`Cinema: ${Cinema.name}`);
  doc.text(`Room: ${CinemaRoom.name}`);
  doc.text(`Seat: ${Seat.name}`);

  doc.text("Thanks for choosing RainFilms!");
  doc.end();
};

module.exports = buildPDF;
