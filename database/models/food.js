// database/models/food.js

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      // aquí puedes definir asociaciones si las hay
    }
  }
  Food.init({
    name:        DataTypes.STRING,
    description: DataTypes.TEXT,
    price:       DataTypes.DECIMAL,
    category:    DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};

