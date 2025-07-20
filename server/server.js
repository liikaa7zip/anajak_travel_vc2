// C:\Users\Panha.Nhean\Desktop\Anajak_Travel_VC2\server\server.js
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Import cors

const app = express(); // Initialize app first

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes (or specify origins)
app.use(cors({
  origin: 'http://localhost:3000', // Allow your Vue app origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies/auth credentials if needed
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });