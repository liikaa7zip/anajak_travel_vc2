// // C:\Users\Panha.Nhean\Desktop\Anajak_Travel_VC2\server\server.js
// const express = require('express');
// const { sequelize } = require('./models');
// const userRoutes = require('./routes/userRoutes');
// const createDefaultAdmin = require('./seeders/createDefaultAdmin');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(express.json());
// app.use('/api/users', userRoutes);

// // Sync DB and run server
// sequelize.sync({ alter: true })
//   .then(async () => {
//     console.log('✅ Database & tables synced');

//     // Create default admin here
//     await createDefaultAdmin();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('❌ Unable to sync database:', error);
//   });



// === server/server.js ===
const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const createDefaultAdmin = require('./seeders/createDefaultAdmin')
const db = require('./models')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }))
app.use(express.json())
app.use('/api/users', userRoutes)

db.sequelize.sync({ alter: true }).then(async () => {
  console.log('✅ Database & tables synced')
  await createDefaultAdmin()
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
}).catch(err => console.error('❌ DB Sync Error:', err))