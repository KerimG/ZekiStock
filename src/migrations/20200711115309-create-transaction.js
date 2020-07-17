'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transctionId: {
        type: Sequelize.STRING,
        eferences: {
          model: 'TransactionId', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      product: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      market: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      quoteCurrency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quote: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      localCurrency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quoteInLocalCurrsency: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      valueCurrency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      fx: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      feeCurrency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fee: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      totalCurrency: { allowNull: false, type: Sequelize.STRING },
      total: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
