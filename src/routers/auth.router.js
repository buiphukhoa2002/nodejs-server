const { Router } = require("express");
const {
  signIn,
  signUp,
  resetPassword,
} = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/reset-password", resetPassword);

const passport = require("passport");
const facebookStrategy = require("passport-facebook-token");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
passport.use(
  "fbAuth",
  new facebookStrategy(
    {
      clientID: "633132611165446",
      clientSecret: "3a72053567ca6eaa363ef9784caba2a8",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const foundedUser = await User.findOne({
          where: { email },
        });
        let loginUser = foundedUser;
        if (!foundedUser) {
          loginUser = await User.create({
            email: email,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
        }
        done(null, loginUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

authRouter.post(
  "/facebook/login",
  passport.authenticate("fbAuth", { session: false }),
  async (req, res) => {
    try {
      const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
      res.status(200).send({
        ...req.user.dataValues,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

module.exports = {
  authRouter,
};
