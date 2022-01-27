const dayjs = require("dayjs");

module.exports = (data) => {
  const { CinemaRoom, Seats, Movie } = data;
  const { Cinema } = CinemaRoom;
  let seatList = "";
  for (let seat of Seats) {
    seatList += `${seat.name} `;
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          * {
            font-size: 20px;
          }
          li {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div style="width: 30%; margin: 0 auto">
          <img
            style="width: 100%"
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/530/5882468530_85690e2b-cad3-4b22-af20-b5ded179944f.png?cb=1629727349"
          />
        </div>
        <div style="width: 80%; margin: 0 auto">
          <h4>Ticket id: <span style="font-size: 30px">#${data.id}</span></h4>
          <h4>Ticket information:</h4>
          <ul>
            <li>Movie: ${Movie.name}</li>
            <li>Time: ${dayjs(data.startTime).format("HH:mm DD/MM/YYYY")}</li>
            <li>Cinema:${Cinema.name}</li>
            <li>Room: ${CinemaRoom.name}</li>
            <li>Seat: ${seatList}</li>
          </ul>
        </div>
      </body>
    </html>
    
    `;
};
