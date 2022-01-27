"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CinemaSystem, CinemaRoom }) {
      this.belongsTo(CinemaSystem, {
        foreignKey: "cinemaSystemId",
        onDelete: "CASCADE",
      });
      this.hasMany(CinemaRoom, {
        foreignKey: "cinemaId",
        onDelete: "CASCADE",
      });
    }
  }
  Cinema.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      cinemaSystemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
