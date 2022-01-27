"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie, CinemaRoom, Seat }) {
      this.belongsTo(Movie, {
        foreignKey: "movieId",
        onDelete: "CASCADE",
      });
      this.belongsTo(CinemaRoom, {
        foreignKey: "cinemaRoomId",
        onDelete: "CASCADE",
      });
      this.hasMany(Seat, {
        foreignKey: "showtimeId",
        onDelete: "CASCADE",
      });
    }
  }
  ShowTime.init(
    {
      startTime: DataTypes.DATE,
      cinemaRoomId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShowTime",
    }
  );
  return ShowTime;
};
