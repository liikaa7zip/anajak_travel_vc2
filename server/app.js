const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

import dotenv from 'dotenv';

import weatherRoutes from './routes/weatherRoutes.js';
dotenv.config();

// Import routes
const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const flightRoutes = require('./routes/flightRoutes');
const boatBookingRoutes = require('./routes/boatBookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Use weather routes
app.use('/weather', weatherRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Register API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/flightbookings', flightRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/boatbookings', boatBookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes);

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB sync failed:', err);
  });
