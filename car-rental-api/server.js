const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./rent');
require('dotenv').config();

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', carRoutes);

// Konektimiii me databaze
connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});