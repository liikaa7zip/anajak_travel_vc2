// server.js (or app.js)
const express = require('express');
const http = require('http');
const cors = require('cors');
const { sequelize } = require('./models');

const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const flightRoutes = require('./routes/flightRoutes');
const boatBookingRoutes = require('./routes/boatBookingRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const locationRoutes = require('./routes/locationRoutes');

const createDefaultAdmin = require('./seeders/createDefaultAdmin');
const createDefaultLocations = require('./seeders/createDefaultLocations');
const createDefaultCars = require('./seeders/20250807-insert-cars')
const createDefaultRoles = require('./seeders/createDefaultRoles');

// orderfood
const foodRoutes = require('./routes/foodRoutes');
const orderFoodRoutes = require('./routes/orderFoodRoutes');
// ..............
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
const categoryRoutes = require('./routes/category');
const carRoutes = require('./routes/carRoutes');
const seatsRoutes = require('./routes/seatsRoute')

const payment = require('./routes/PaymentRoutes');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flightbookings', flightRoutes);
app.use('/api/boatbookings', boatBookingRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotel-booking', hotelBookingRoutes);  // Note singular 'hotel-booking'
app.use('/api/locations', locationRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderFoodRoutes);
// app.use('/api', locationRoutes);
app.use('/api/featured-stories', featuredStoriesRoutes);
app.use('/api/travel-guides', travelGuidesRoutes);
app.use('/api/gallery-photos', galleryPhotosRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/payments', payment);
app.use('/api/cars', carRoutes);
app.use('/api/seats', seatsRoutes)

// Uncomment if you want admin user routes
// app.use('/api/admin-users', adminUserRoutes);
app.use('/api/categories', categoryRoutes);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('send_message', async (msg, callback) => {
    try {
      // Save message to DB
      const savedMsg = await Message.create({
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        sender: msg.sender,
        receiver: msg.receiver,
        message: msg.message,
      });

      // Emit to receiver (assuming you have userId-based rooms or tracking)
      io.to(msg.receiverId.toString()).emit('receive_message', savedMsg);

      // Confirm to sender
      callback({ status: 'ok' });
    } catch (error) {
      console.error('Error saving message:', error);
      callback({ status: 'error', error: error.message });
    }
  });

  // When user connects, join a room with their user id for direct messages
  socket.on('join', (userId) => {
    socket.join(userId);
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
