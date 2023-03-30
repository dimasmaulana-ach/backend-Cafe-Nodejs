'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class data_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.kasir, {
        foreignKey: "id_kasir",
        as: "kasirs"
      })
      this.belongsTo(models.menu, {
        foreignKey: "id_menu",
        as: "data_menu"
      })
    }
  }
  data_details.init({
    id_kasir: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    total_harga: DataTypes.DOUBLE,
    total_barang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'data_details',
  });
  return data_details;
};