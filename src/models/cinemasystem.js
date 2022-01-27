"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CinemaSystem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cinema, {
        foreignKey: "cinemaSystemId",
        onDelete: "CASCADE",
      });
    }
  }
  CinemaSystem.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CinemaSystem",
    }
  );
  return CinemaSystem;
};
