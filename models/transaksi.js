'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi, {
        foreignKey: 'id_transaksi',
        as: 'details_transaksis'
      })

      this.belongsTo(models.kasir, {
        foreignKey: 'id_kasir', 
        as: 'kasirs'
      })

      this.belongsTo(models.meja, {
        foreignKey: 'id_meja',
        as:'meja_pelanggan'
      })
    }
  }
  transaksi.init({
    tgl_transaksi: DataTypes.DATE,
    id_kasir: DataTypes.INTEGER,
    id_meja: DataTypes.INTEGER,
    nama_pelanggan: DataTypes.STRING,
    status: DataTypes.STRING,
    metode_pembayaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};