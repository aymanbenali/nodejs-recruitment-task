"use strict";

module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    "Movies",
    {
      userId: DataTypes.INTEGER(11),
      Title: DataTypes.STRING,
      Released: DataTypes.STRING,
      Genre: DataTypes.STRING,
      Director: DataTypes.STRING,
    },
    {
      tableName: "Movies",
    }
  );
  Movies.associate = function (models) {
    // associations can be defined here
  };

  return Movies;
};
