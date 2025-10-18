require('dotenv').config();
const express = require('express');
const app = express();
const  { sequelize } = require('./config/db');
const PORT = process.env.PORT || 7000;

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connecté à MySQL via Sequelize');
    // 🔥 On démarre le serveur ici pour garder le processus actif
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Erreur de connexion MySQL :', err));





