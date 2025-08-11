// seeders/createDefaultRoles.js
const db = require('../models');
const Role = db.Role;

async function createDefaultRoles() {
  try {
    const roles = ['admin', 'user', 'restaurant_owner', 'hotel_owner', 'transport_owner'];


    for (const name of roles) {
      await Role.findOrCreate({ where: { name } });
    }

    console.log('✅ Default roles created or already exist');
  } catch (error) {
    console.error('❌ Error creating roles:', error.message);
  }
}

module.exports = createDefaultRoles;
