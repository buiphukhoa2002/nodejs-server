const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const { generateHashPassword } = require("../utils/hashing");
const { PORT, SECRET_KEY } = require("../app_config");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findByPk(id);
    res.status(200).send(userDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const hashPassword = generateHashPassword(password);
    const newUser = await User.create({
      name,
      email,
      phone,
      role,
      password: hashPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;
    await User.update({ name, email, phone, role }, { where: { id } });
    const userDetail = await User.findByPk(id);
    res.status(200).send(userDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const userDetail = await User.findByPk(id);
    userDetail.password = generateHashPassword(password);
    await userDetail.save();
    res.status(200).send(userDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    if (id === user.id) {
      res.status(401).send({
        message: "Cannot delete yourself",
      });
    }
    const userDetail = await User.findByPk(id);
    await User.destroy({
      where: { id },
    });
    res.status(200).send(userDetail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { user, file } = req;
    const urlImage = `http://localhost:${PORT}/` + file.path;
    const userUploadAvatar = await User.findByPk(user.id);
    userUploadAvatar.avatar = urlImage;
    await userUploadAvatar.save();
    res.status(200).send(userUploadAvatar);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const urlImage = `http://localhost:${PORT}/` + file.path;
    const userUploadAvatar = await User.findByPk(id);
    userUploadAvatar.avatar = urlImage;
    await userUploadAvatar.save();
    res.status(200).send(userUploadAvatar);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const authenticateUser = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).send(user);
};

module.exports = {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  authenticateUser,
  updatePassword,
  updateAvatar,
};
