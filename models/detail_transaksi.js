'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.menu, {
        foreignKey: 'id_menu',
        as: 'details_menu'
      })
      this.belongsTo(models.transaksi, {
        foreignKey: 'id_transaksi',
        as: 'transaksis'
      })
    }
  }
  detail_transaksi.init({
    id_transaksi: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    harga: DataTypes.DOUBLE,
    total_harga: DataTypes.DOUBLE,
    total_barang: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'detail_transaksi',
  });
  return detail_transaksi;
};