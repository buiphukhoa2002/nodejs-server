const checkExist = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const modelDetail = await Model.findOne({
      where: { id },
    });
    if (modelDetail) {
      next();
    } else {
      res.status(404).send({
        message: "Id does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  checkExist,
};
