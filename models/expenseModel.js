const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Category = require('./CategoryModel');

const Expense = sequelize.define('Expense', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });
Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Expense;
