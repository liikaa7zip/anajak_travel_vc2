// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Single import of Server
const cors = require('cors');
const axios = require('axios');
const { sequelize } = require('./models');

const weatherRoutes = require('./routes/weatherRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const flightRoutes = require('./routes/flightRoutes');
const boatBookingRoutes = require('./routes/boatBookingRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const locationRoutes = require('./routes/locationRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderFoodRoutes = require('./routes/orderFoodRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const messageRoutes = require('./routes/messageRoutes');
const featuredStoriesRoutes = require('./routes/featuredStoriesRoutes');
const travelGuidesRoutes = require('./routes/travelGuidesRoutes');
const galleryPhotosRoutes = require('./routes/galleryPhotosRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const categoryRoutes = require('./routes/category');
const carRoutes = require('./routes/carRoutes');
const seatsRoutes = require('./routes/seatsRoute');
const payment = require('./routes/PaymentRoutes');

const createDefaultAdmin = require('./seeders/createDefaultAdmin');
const createDefaultLocations = require('./seeders/createDefaultLocations');
const createDefaultCars = require('./seeders/20250807-insert-cars');

const db = require('./models'); // Sequelize models
const Message = db.Message;

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', weatherRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flightbookings', flightRoutes);
app.use('/api/boatbookings', boatBookingRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotel-booking', hotelBookingRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderFoodRoutes);
app.use('/api/featured-stories', featuredStoriesRoutes);
app.use('/api/travel-guides', travelGuidesRoutes);
app.use('/api/gallery-photos', galleryPhotosRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/payments', payment);
app.use('/api/cars', carRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/categories', categoryRoutes);
// Uncomment if you want admin user routes
// app.use('/api/admin-users', adminUserRoutes);

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle location change
  socket.on('changeLocation', async (location) => {
    try {
      const response = await axios.get(
        `http://localhost:${process.env.PORT || 3000}/api/weather?location=${encodeURIComponent(location)}`
      );
      socket.broadcast.emit('locationUpdate', response.data);
    } catch (error) {
      console.error('Error broadcasting location update:', error);
    }
  });

  // Handle chat room joining
  socket.on('join', (username) => {
    socket.join(username);
    console.log(`${username} joined room ${username}`);
  });

  // Handle message sending
  socket.on('send_message', async (data, callback) => {
    try {
      const savedMsg = await Message.create({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      });

      io.to(data.sender).emit('receive_message', savedMsg);
      io.to(data.receiver).emit('receive_message', savedMsg);

      callback({ status: 'ok' });
    } catch (err) {
      console.error('Failed to save message:', err);
      callback({ status: 'error', error: err.message });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database synced');
    await createDefaultAdmin();
    await createDefaultLocations();
    await createDefaultCars();

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB sync failed:', err);
  });