const express = require("express");
const cors = require("cors");
const path = require("path");
const { rootRouter } = require("./src/routers/root.router");
const { PORT } = require("./src/app_config/");

const app = express();
app.use(cors());
app.use(express.json());

const pathPublicDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(pathPublicDirectory));

app.use("/api/v1", rootRouter);
app.listen(PORT, () => {
  console.log("Movie app is running on port " + PORT);
});
