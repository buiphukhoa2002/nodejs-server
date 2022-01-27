"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ShowTime, {
        foreignKey: "showtimeId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Ticket, {
        foreignKey: "seatId",
        onDelete: "CASCADE",
      });
    }
  }
  Seat.init(
    {
      name: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      type: DataTypes.STRING,
      showtimeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
