'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kasir: {
        type: Sequelize.INTEGER,
        references : {
          model: "kasir",
          key: "id"
        }
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: "menu",
          key: "id"
        }
      },
      total_harga: {
        type: Sequelize.DOUBLE
      },
      total_barang: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data_details');
  }
};