'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TransactionId, {
        foreignKey: 'transactionId',
        onDelete: 'CASCADE',
      });
    }
  }
  Transaction.init(
    {
      transactionId: DataTypes.STRING,
      date: DataTypes.DATE,
      product: DataTypes.STRING,
      isin: DataTypes.STRING,
      market: DataTypes.STRING,
      count: DataTypes.NUMBER,
      quoteCurrency: DataTypes.STRING,
      quote: DataTypes.NUMBER,
      localCurrency: DataTypes.STRING,
      quoteInLocalCurrsency: DataTypes.NUMBER,
      valueCurrency: DataTypes.STRING,
      value: DataTypes.NUMBER,
      exchangeRate: DataTypes.NUMBER,
      feeCurrency: DataTypes.STRING,
      fee: DataTypes.NUMBER,
      totalCurrency: DataTypes.STRING,
      total: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
