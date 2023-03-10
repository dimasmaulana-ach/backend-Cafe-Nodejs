'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      tgl_transaksi: {
        type: Sequelize.DATE
      },
      id_kasir: {
        type: Sequelize.INTEGER,
        references: {
          model: "kasir",
          key: "id"
        }
      },
      id_meja: {
        type: Sequelize.INTEGER,
        references: {
          model: "meja",
          key:"id"
        }
      },
      nama_pelanggan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      metode_pembayaran: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('transaksi');
  }
};