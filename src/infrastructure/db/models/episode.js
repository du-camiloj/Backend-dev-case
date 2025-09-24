'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Episode.belongsToMany(models.Character, { through: models.EpisodeCharacter, foreignKey: "episodeId", as: "characters" });
    }
  }
  Episode.init({
    name: DataTypes.STRING,
    air_date: DataTypes.STRING,
    episode: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Episode',
  });
  return Episode;
};