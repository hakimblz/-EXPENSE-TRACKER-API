const express = require('express');
const router = express.Router();
const { createExpense, getExpenses ,updateExpense,deleteExpense} = require('../controllers/expenseController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createExpense);
router.get('/', auth, getExpenses);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;
