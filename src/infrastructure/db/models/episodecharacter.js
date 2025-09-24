'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EpisodeCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EpisodeCharacter.belongsTo(models.Episode, { foreignKey: 'episodeId' });
      EpisodeCharacter.belongsTo(models.Character, { foreignKey: 'characterId' });
    }
  }
  EpisodeCharacter.init({
    episodeId: DataTypes.INTEGER,
    characterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EpisodeCharacter',
  });
  return EpisodeCharacter;
};