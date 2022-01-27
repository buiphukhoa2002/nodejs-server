"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CinemaRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cinema, ShowTime }) {
      this.belongsTo(Cinema, {
        foreignKey: "cinemaId",
        onDelete: "CASCADE",
      });
      this.hasMany(ShowTime, {
        foreignKey: "cinemaRoomId",
        onDelete: "CASCADE",
      });
    }
  }
  CinemaRoom.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      cinemaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CinemaRoom",
    }
  );
  return CinemaRoom;
};
