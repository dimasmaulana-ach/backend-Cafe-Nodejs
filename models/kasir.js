'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kasir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: 'id',
        as: 'kasir_transaksi'
      })

      this.hasMany(models.bug_report, {
        foreignKey: "id",
        as: "kasir_report"
      })

      this.belongsTo(models.role, {
        foreignKey: 'role',
        as: 'roles'
      })
    }
  }
  kasir.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kasir',
    tableName: 'kasir'
  });
  return kasir;
};