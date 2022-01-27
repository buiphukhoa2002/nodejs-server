const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateHashPassword } = require("../utils/hashing");
const { SECRET_KEY } = require("../app_config");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashPassword = generateHashPassword(password);
    const newUser = await User.create({
      role: "CLIENT",
      name,
      email,
      password: hashPassword,
      phone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await User.findOne({
      where: { email },
    });
    if (userLogin) {
      const isAuth = bcryptjs.compareSync(password, userLogin.password);
      if (isAuth) {
        const payload = {
          id: userLogin.id,
          name: userLogin.name,
          email: userLogin.email,
          role: userLogin.role,
          phone: userLogin.phone,
          password: userLogin.password,
        };
        const token = jwt.sign(payload, SECRET_KEY);
        res
          .status(200)
          .send({ ...payload, message: "Login successfully", token });
      } else {
        res.status(400).send({
          message: "Incorrect password",
        });
      }
    } else {
      res.status(404).send({ message: "Email does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const defaultPassword = "abcdef";
    const userDetail = await User.findOne({
      where: { email },
    });
    if (userDetail) {
      userDetail.password = generateHashPassword(defaultPassword);
      await userDetail.save();
      res.status(200).send({
        message: "Reset password successfully",
        newPassword: defaultPassword,
      });
    } else {
      res.status(404).send({ message: "Email does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  signIn,
  signUp,
  resetPassword,
};
