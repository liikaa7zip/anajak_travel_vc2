// server.js (or app.js)
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Single import of Server
const cors = require('cors');
const { sequelize } = require('./models');
const multer = require("multer");
const fs = require("fs");
const path = require('path');



// ✅ Import weather routes
const weatherRoutes = require('./routes/weatherRoutes');

const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');
const flightRoutes = require('./routes/flightRoutes');
const boatBookingRoutes = require('./routes/boatBookingRoutes');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const hotelOwnerRoutes = require('./routes/hotelOwnerRoutes');
const adminHotelRoutes = require('./routes/adminHotelRoutes');
const userHotelRoutes = require('./routes/userHotelRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const locationRoutes = require('./routes/locationRoutes');

const createDefaultAdmin = require('./seeders/createDefaultAdmin');
const createDefaultLocations = require('./seeders/createDefaultLocations');
const createDefaultCars = require('./seeders/20250807-insert-cars')
const createDefaultRoles = require('./seeders/createDefaultRoles');

// orderfood
const foodRoutes = require('./routes/foodRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const messageRoutes = require('./routes/messageRoutes');
const featuredStoriesRoutes = require('./routes/featuredStoriesRoutes');
const travelGuidesRoutes = require('./routes/travelGuidesRoutes');
const galleryPhotosRoutes = require('./routes/galleryPhotosRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const categoryRoutes = require('./routes/category');
const carRoutes = require('./routes/carRoutes');
const seatsRoutes = require('./routes/seatsRoute');
const orderRoutes = require('./routes/orderRoutes');




const db = require('./models'); // Sequelize models
const Message = db.Message;

const reportRoutes = require('./routes/reportRoutes');
const payment = require('./routes/PaymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();
const server = http.createServer(app);

// ✅ Allow both Vue dev ports
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
// app.use(cors());


// ✅ API routes
app.use('/api', weatherRoutes);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/flightbookings', flightRoutes);
app.use('/api/boatbookings', boatBookingRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotel-owners', hotelOwnerRoutes);
app.use('/api/admin-hotels', adminHotelRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes); 
app.use('/api/user-hotels', userHotelRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/foods', foodRoutes);
// app.use('/api', locationRoutes);
app.use('/api/featured-stories', featuredStoriesRoutes);
app.use('/api/travel-guides', travelGuidesRoutes);
app.use('/api/gallery-photos', galleryPhotosRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/payments', payment);
app.use('/api/cars', carRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/reports', reportRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

// Serve uploads folder so images can be accessed publicly
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route for upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Uncomment if you want admin user routes
// app.use('/api/admin-users', adminUserRoutes);
app.use('/api/categories', categoryRoutes);
const io = new Server(server, {
  cors: {
    origin:  allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true,
// }));
// app.use(express.json());

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

      // Emit to both sender and receiver rooms
      io.to(msg.senderId.toString()).emit('receive_message', savedMsg);
      io.to(msg.receiverId.toString()).emit('receive_message', savedMsg);

      // Confirm to sender
      callback({ status: 'ok' });
    } catch (error) {
      console.error('Error saving message:', error);
      callback({ status: 'error', error: error.message });
    }
  });

  // Join user to their room on connection
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