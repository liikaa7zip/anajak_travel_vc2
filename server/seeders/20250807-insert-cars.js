const db = require('../models');

async function createDefaultCars() {
  try {
    const cars = [
      {
        name: 'Car A',
        description: 'Hyundai',
      },
      {
        name: 'Car B',
        description: 'VIP Mini Van',
      },
      {
        name: 'Car C',
        description: 'Private Car with A/C',
      },
      {
        name: 'Car D',
        description: 'Kia Telluride',
      },
      {
        name: 'Car E',
        description: 'DongFeng',
      },
    ];

    const existingCars = await db.Car.findAll();
    if (existingCars.length === 0) {
      await db.Car.bulkCreate(cars);
      console.log('✅ Default cars created');
    } else {
      console.log('ℹ️ Cars already exist');
    }
  } catch (error) {
    console.error('❌ Error creating default cars:', error.message);
  }
}

module.exports = createDefaultCars;
