// server.js (or app.js)
const express = require('express');
const http = require('http');
const cors = require('cors');
const { sequelize } = require('./models');

const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const locationRoutes = require('./routes/locationRoutes');

const createDefaultAdmin = require('./seeders/createDefaultAdmin');
const createDefaultLocations = require('./seeders/createDefaultLocations');
const path = require('path');
const { Server } = require('socket.io');

const db = require('./models'); // Sequelize models
const Message = db.Message;

const adminUserRoutes = require('./routes/adminUserRoutes');
const messageRoutes = require('./routes/messageRoutes');



const featuredStoriesRoutes = require('./routes/featuredStoriesRoutes');
const travelGuidesRoutes = require('./routes/travelGuidesRoutes');
const galleryPhotosRoutes = require('./routes/galleryPhotosRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flightbookings', flightRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotel-booking', hotelBookingRoutes);  // Note singular 'hotel-booking'
app.use('/api', locationRoutes);
app.use('/api/featured-stories', featuredStoriesRoutes);
app.use('/api/travel-guides', travelGuidesRoutes);
app.use('/api/gallery-photos', galleryPhotosRoutes);
app.use('/api/itineraries', itineraryRoutes);
// Uncomment if you want admin user routes
// app.use('/api/admin-users', adminUserRoutes);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('join', (username) => {
    socket.join(username);
    console.log(`${username} joined room ${username}`);
  });

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

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database synced');
    await createDefaultAdmin();
    await createDefaultLocations();

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB sync failed:', err);
  });
