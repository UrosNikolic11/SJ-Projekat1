'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ball extends Model {
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
  Ball.init({
    naziv: DataTypes.STRING,
    cena: DataTypes.INTEGER,
    velicina: DataTypes.INTEGER,
    sport: DataTypes.STRING,
    opis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ball',
  });
  return Ball;
};