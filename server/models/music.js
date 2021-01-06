"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsTo(models.Artist, {
        as: "artist",
      });
    }
  }
  Music.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.DATEONLY,
      artistId: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Music",
    }
  );
  return Music;
};
