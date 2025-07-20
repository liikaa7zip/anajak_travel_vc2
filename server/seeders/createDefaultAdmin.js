// server/seeders/createDefaultAdmin.js
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

async function createDefaultAdmin() {
  try {
    const admin = await User.findOne({ where: { email: 'admin@gmail.com' } });

    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Default admin created');
    } else {
      console.log('ℹ️ Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
}

module.exports = createDefaultAdmin;
