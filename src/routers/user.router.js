const { Router } = require("express");
const {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  authenticateUser,
  updatePassword,
  updateAvatar,
} = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/tokenVerification");
const {
  uploadSingleImage,
} = require("../middlewares/uploads/uploadImage.middleware");
const {
  checkExist,
} = require("../middlewares/validations/checkExist.middleware");

const { User } = require("../models");
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/authenticate", authenticate, authenticateUser);
userRouter.get("/:id", checkExist(User), getUserDetail);
userRouter.post("/", createUser);
userRouter.put("/password/:id", checkExist(User), updatePassword);
userRouter.put("/:id", checkExist(User), updateUser);
userRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPER_ADMIN"]),
  checkExist(User),
  deleteUser
);

userRouter.post(
  "/upload-avatar",
  authenticate,
  uploadSingleImage("avatar"),
  uploadAvatar
);

userRouter.post(
  "/update-avatar/:id",
  uploadSingleImage("avatar"),
  updateAvatar
);

module.exports = {
  userRouter,
};
