'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_transaksi', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.UUID,
        references: {
          model: 'transaksi',
          key: 'id'
        }
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'menu',
          key: 'id'
        }
      },
      harga: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('detail_transaksi');
  }
};