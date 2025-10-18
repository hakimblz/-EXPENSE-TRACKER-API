const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createCategory);
router.get('/', auth, getAllCategories);

module.exports = router;
