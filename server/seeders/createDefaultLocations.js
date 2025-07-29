const db = require('../models');

async function createDefaultLocations() {
  try {
    const locations = [
      { name: 'Phnom Penh', country: 'Cambodia' },
      { name: 'Siem Reap', country: 'Cambodia' },
      { name: 'Battambang', country: 'Cambodia' },
      { name: 'Sihanoukville', country: 'Cambodia' },
      { name: 'Kampot', country: 'Cambodia' },
      { name: 'Kep', country: 'Cambodia' },
      { name: 'Kandal', country: 'Cambodia' },
      { name: 'Takeo', country: 'Cambodia' },
      { name: 'Kampong Cham', country: 'Cambodia' },
      { name: 'Kampong Chhnang', country: 'Cambodia' },
      { name: 'Kampong Thom', country: 'Cambodia' },
      { name: 'Kampong Speu', country: 'Cambodia' },
      { name: 'Pursat', country: 'Cambodia' },
      { name: 'Prey Veng', country: 'Cambodia' },
      { name: 'Svay Rieng', country: 'Cambodia' },
      { name: 'Preah Vihear', country: 'Cambodia' },
      { name: 'Oddar Meanchey', country: 'Cambodia' },
      { name: 'Banteay Meanchey', country: 'Cambodia' },
      { name: 'Pailin', country: 'Cambodia' },
      { name: 'Kratie', country: 'Cambodia' },
      { name: 'Stung Treng', country: 'Cambodia' },
      { name: 'Mondulkiri', country: 'Cambodia' },
      { name: 'Ratanakiri', country: 'Cambodia' },
      { name: 'Tbong Khmum', country: 'Cambodia' },
      { name: 'Koh Kong', country: 'Cambodia' },
    ];

    const existingLocations = await db.Location.findAll();
    if (existingLocations.length === 0) {
      await db.Location.bulkCreate(locations);
      console.log('✅ Default locations created');
    } else {
      console.log('ℹ️ Locations already exist');
    }
  } catch (error) {
    console.error('❌ Error creating default locations:', error.message);
  }
}

module.exports = createDefaultLocations;