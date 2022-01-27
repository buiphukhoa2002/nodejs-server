const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  PORT,
  SECRET_KEY,
};
