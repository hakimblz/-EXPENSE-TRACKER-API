const Expense = require('../models/expenseModel');
const Category = require('../models/CategoryModel');
const User = require('../models/userModel');
// const EventEmitter = require('events');
const expenseEmitter = require('../events/expenseEvents');

expenseEmitter.on('budgetExceeded', (data) => {
  console.log(`⚠️ Alerte budget dépassé pour ${data.categoryName} : Dépense = ${data.amount} DA`);
});

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, date, categoryId } = req.body;
    const expense = await Expense.create({
      description,
      amount,
      date,
      categoryId,
      userId: req.user.id, // récupéré depuis le token
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      include: [Category],
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, categoryId } = req.body;

    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });
    if (!expense) {
      return res.status(404).json({ message: "Dépense introuvable ou non autorisée" });
    }

    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;
    expense.categoryId = categoryId || expense.categoryId;

    await expense.save();
    res.json({ message: "✅ Dépense mise à jour avec succès", expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });
    if (!expense) {
      return res.status(404).json({ message: "Dépense introuvable ou non autorisée" });
    }

    await expense.destroy();
    res.json({ message: "🗑️ Dépense supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
