// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');


// const userRoutes = require('./routes/userRoutes'); // your user routes
// const db = require('./models'); // Sequelize models
// const Message = db.Message;

// const app = express();
// const server = http.createServer(app);

// const messageRoutes = require('./routes/messageRoutes');
// app.use('/api/messages', messageRoutes);
// app.use('/api/users', messageRoutes); 

// app.use(cors({
//   origin: 'http://localhost:3000', // your Vue app origin
//   credentials: true
// }));

// app.use(express.json());

// // Mount your user API routes on /api/users
// app.use('/api/users', userRoutes);

// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// io.on('connection', (socket) => {
//   console.log('User connected', socket.id);

//   socket.on('send_message', async (data, callback) => {
//   try {
//     const savedMsg = await Message.create({
//       sender: data.sender,
//       receiver: data.receiver,
//       message: data.message,   // <-- must match DB column
//     });

//     io.to('admin').emit('receive_message', savedMsg);
//     callback({ status: 'ok' });
//   } catch (err) {
//     console.error('Failed to save message:', err);
//     callback({ status: 'error', error: err.message });
//   }
// });


//   socket.on('join', (room) => {
//     socket.join(room);
//     console.log(`${socket.id} joined room ${room}`);
//   });
// });





// // Sync DB and start server
// const PORT = process.env.PORT || 5000;
// db.sequelize.sync().then(() => {
//   server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });


// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');

// const userRoutes = require('./routes/userRoutes'); // your user routes
// const messageRoutes = require('./routes/messageRoutes'); // your message routes
// const db = require('./models'); // Sequelize models
// const Message = db.Message;

// const app = express();
// const server = http.createServer(app);

// app.use(cors({
//   origin: 'http://localhost:3000', // your Vue app origin
//   credentials: true,
// }));

// app.use(express.json());

// // Mount your API routes
// app.use('/api/users', userRoutes);
// app.use('/api/messages', messageRoutes);


// const adminUserRoutes = require('./routes/adminUserRoutes');
// app.use('/api/users/admin', adminUserRoutes);


// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   }
// });

// io.on('connection', (socket) => {
//   console.log('User connected', socket.id);

//   // Join room(s) based on username (room names are usernames)
//   socket.on('join', (room) => {
//     socket.join(room);
//     console.log(`Socket ${socket.id} joined room ${room}`);
//   });

//   // Handle incoming messages and save to DB
//   socket.on('send_message', async (data, callback) => {
//     try {
//       // Save message in DB
//       const savedMsg = await Message.create({
//         sender: data.sender,
//         receiver: data.receiver,
//         message: data.message,
//       });

//       // Emit the message to sender's room
//       io.to(data.sender).emit('receive_message', savedMsg);

//       // Emit the message to receiver's room
//       io.to(data.receiver).emit('receive_message', savedMsg);

//       callback({ status: 'ok' });
//     } catch (err) {
//       console.error('Failed to save message:', err);
//       callback({ status: 'error', error: err.message });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected', socket.id);
//   });
// });

// // Sync DB and start server
// const PORT = process.env.PORT || 5000;
// db.sequelize.sync().then(() => {
//   server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });


const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const db = require('./models'); // Sequelize models
const Message = db.Message;

const userRoutes = require('./routes/userRoutes'); 
const adminUserRoutes = require('./routes/adminUserRoutes');
const messageRoutes = require('./routes/messageRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const transportRoutes = require('./routes/transportRoutes');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api', messageRoutes); 
app.use('/api/users', userRoutes);
// app.use('/api/admin-users', adminUserRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/transports', transportRoutes);

// Socket.IO setup
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

// Sync DB and start server
const PORT = process.env.PORT || 5000;
db.sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB sync failed:', err);
});
