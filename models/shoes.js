'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Brand}) {
      // define association here
      this.belongsTo(Brand, {foreignKey: 'brandId', as: 'brand'});
    }
  };
  Shoes.init({
    naziv: DataTypes.STRING,
    cena: DataTypes.INTEGER,
    broj: DataTypes.INTEGER,
    tip: DataTypes.STRING,
    opis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shoes',
  });
  return Shoes;
};