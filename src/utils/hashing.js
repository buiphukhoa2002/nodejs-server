const bcryptjs = require("bcryptjs");

const generateHashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

module.exports = {
  generateHashPassword,
};
