'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Shoes}) {
      // define association here
      this.hasMany(Shoes, {foreignKey: 'brandId', as: 'brand'});
    }
    static associate2({Ball}) {
      // define association here
      this.hasMany(Ball, {foreignKey: 'brandId', as: 'brand'});
    }
  };
  Brand.init({
    naziv: DataTypes.STRING,
    zemlja: DataTypes.STRING,
    godinaOsnivanja: DataTypes.STRING,
    osnivac: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};