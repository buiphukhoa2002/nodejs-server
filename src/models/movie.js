"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ShowTime, {
        foreignKey: "movieId",
        onDelete: "CASCADE",
      });
    }
  }
  Movie.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      trailer: DataTypes.STRING,
      poster: DataTypes.STRING,
      duration: DataTypes.TIME,
      startDate: DataTypes.DATE,
      rating: DataTypes.INTEGER,
      director: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
