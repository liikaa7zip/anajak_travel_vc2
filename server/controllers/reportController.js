const { Booking } = require('../models'); // Adjust if your booking model is named differently
const { Op } = require('sequelize')

exports.getBookingsCount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Build the where clause dynamically
    let where = {};

    if (startDate && endDate) {
      where.date = {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      };
    } else if (startDate) {
      where.date = { [Op.gte]: startDate };
    } else if (endDate) {
      where.date = { [Op.lte]: endDate };
    }

    console.log('Query filter:', where);

    // Count bookings filtered by 'date'
    const count = await Booking.count({ where });

    console.log('Booking count:', count);

    res.json({ count });
  } catch (error) {
    console.error('Error in getBookingsCount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};