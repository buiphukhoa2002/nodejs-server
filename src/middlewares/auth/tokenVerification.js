const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../app_config");

// Check if the user is logged in or not
const authenticate = (req, res, next) => {
  try {
    const token = req.header("token");
    const decode = jwt.verify(token, SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Token is not valid",
    });
  }
};

// Role permission (phân quyền)
const authorize = (arrayRole) => (req, res, next) => {
  const { user } = req;
  if (arrayRole.includes(user.role)) {
    next();
  } else {
    res.status(403).send({
      message: "You do not have permission to execute this command",
    });
  }
};

module.exports = {
  authenticate,
  authorize,
};
