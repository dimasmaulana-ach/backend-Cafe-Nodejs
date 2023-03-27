'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bug_report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bug_report.init({
    tgl_report: DataTypes.DATE,
    kasir: DataTypes.STRING,
    role: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bug_report',
    tableName: 'bug_report'
  });
  return bug_report;
};