const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/bookings', bookingRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/users', userRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB sync failed:', err));