const Category = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
