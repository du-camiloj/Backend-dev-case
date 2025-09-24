'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasMany(models.Character, { as: "originCharacters", foreignKey: "originId" });
      Location.hasMany(models.Character, { as: "locationCharacters", foreignKey: "locationId" });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    dimension: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};