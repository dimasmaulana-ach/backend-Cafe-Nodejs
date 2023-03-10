'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category_menu, {
        foreignKey: 'category',
        as: 'categorys'
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey: 'id',
        as: 'menu_details'
      })
    }
  }
  menu.init({
    name: DataTypes.STRING,
    category: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    harga: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu'
  });
  return menu;
};