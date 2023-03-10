'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.menu, {
        foreignKey: 'id',
        as: 'categorys_menu'
      })
    }
  }
  category_menu.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category_menu',
    tableName: 'category_menu'
  });
  return category_menu;
};