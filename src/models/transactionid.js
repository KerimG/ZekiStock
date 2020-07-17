'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionId extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here]
      this.hasMany(models.Transaction, {
        foreignKey: 'transactionId',
        onDelete: 'CASCADE',
      });
    }
  }
  TransactionId.init(
    {
      transactionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TransactionId',
    }
  );
  return TransactionId;
};
