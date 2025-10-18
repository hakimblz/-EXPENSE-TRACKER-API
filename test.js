require('dotenv').config();
const { sequelize }= require('./config/db');
const User = require('./models/userModel');
const Category = require('./models/CategoryModel');
const Expense = require('./models/expenseModel');

(async () => {
  try {
    await sequelize.sync({ force: true }); // crée les tables si elles n'existent pas
    console.log('✅ Tables synchronisées avec MySQL');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation :', error);
  } 
  
})();
