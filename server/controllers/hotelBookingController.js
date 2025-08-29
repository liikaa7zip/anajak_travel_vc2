// Enhanced Hotel Booking Controller
const { HotelBooking, Hotel, User, Room, Location } = require('../models');
const { Op } = require('sequelize');

// GET all bookings with enhanced filtering
exports.getAllBookings = async (req, res) => {
  try {
    const { status, hotelId, userId, startDate, endDate, page = 1, limit = 10 } = req.query;

    console.log('Query params:', req.query); // <-- log incoming query

    const whereCondition = {};

    if (status) whereCondition.status = status;
    if (hotelId) whereCondition.hotelId = hotelId;
    if (userId) whereCondition.userId = userId;
    if (startDate && endDate) {
      whereCondition.checkInDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows: bookings } = await HotelBooking.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Hotel,
          attributes: ['id', 'name', 'imageUrl', 'pricePerNight'],
          include: [
            {
              model: Location,
              as: 'Location',
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        {
          model: Room,
          attributes: ['id', 'roomNumber', 'type', 'amenities']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    console.log('Bookings fetched:', bookings.length);

    res.json({
      bookings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalBookings: count,
        hasNext: page * limit < count,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('Get all bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.stack });
  }
};


// GET single booking by ID with full details
exports.getBookingById = async (req, res) => {
  try {
    const booking = await HotelBooking.findByPk(req.params.id, {
      include: [
        { 
          model: Hotel, 
          attributes: ['id', 'name', 'description', 'imageUrl', 'pricePerNight'],
          include: [
            { 
              model: require('../models').Location, 
              as: 'Location', // must match alias from association
              attributes: ['id', 'name']
            }
          ]
        },
        { 
          model: User, 
          attributes: ['id', 'username', 'email'] // removed 'phone'
        },
        {
          model: Room,
          attributes: ['id', 'roomNumber', 'type', 'amenities', 'images', 'maxOccupancy']
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Get booking by ID error:', err);
    res.status(500).json({ message: 'Error fetching booking', error: err.message });
  }
};


exports.getBookingsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const bookings = await HotelBooking.findAll({
      where: {
        hotelId,
        status: { [Op.in]: ['pending', 'confirmed'] }
      },
      attributes: ['roomId', 'checkInDate', 'checkOutDate', 'status']
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching hotel bookings:', error);
    res.status(500).json({ message: 'Failed to fetch hotel bookings' });
  }
};

// Get bookings by hotelId
exports.getBookingsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const bookings = await HotelBooking.findAll({
      where: { hotelId: hotelId },
      include: [{ model: Room }]   // so you know which rooms are booked
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by hotelId:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ always use the authenticated user
    const { 
      hotelId, 
      roomId,
      checkInDate, 
      checkOutDate, 
      guests, 
      totalAmount,
      specialRequests,
      paymentMethod 
    } = req.body;

    // ... (all your validation checks here)

    // Create the booking (✅ store userId from token, not body)
    const newBooking = await HotelBooking.create({
  hotelId,
  userId,
  roomId,
  checkInDate,    // use variable from req.body
  checkOutDate,   // use variable from req.body
  guests,
  totalAmount,
  specialRequests,
  status: 'pending',
  paymentMethod
});


    const createdBooking = await HotelBooking.findByPk(newBooking.id, {
      include: [
        { model: Hotel, attributes: ['name', 'imageUrl'] },
        { model: User, attributes: ['username', 'email'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: createdBooking
    });

  } catch (err) {
    console.error('Create booking error:', err);
    res.status(400).json({ message: 'Failed to create booking', error: err.message });
  }
};




// UPDATE booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status', 
        validStatuses 
      });
    }

    const booking = await HotelBooking.findByPk(id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Prevent updating cancelled or completed bookings
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({ 
        message: `Cannot update booking with status: ${booking.status}` 
      });
    }

    await booking.update({ 
      status, 
      notes,
      updatedAt: new Date()
    });

    const updatedBooking = await HotelBooking.findByPk(id, {
      include: [
        { model: Hotel, attributes: ['name'] },
        { model: User, attributes: ['username', 'email'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    res.json({ 
      message: `Booking status updated to ${status}`, 
      booking: updatedBooking 
    });

  } catch (err) {
    console.error('Update booking status error:', err);
    res.status(500).json({ message: 'Error updating booking status', error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching bookings for userId:', userId);

    const bookings = await HotelBooking.findAll({
      where: { userId },
      include: [
        { model: Hotel, as: 'Hotel' },
        { model: Room, as: 'Room' }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log('Found bookings:', bookings);

    // Change: Return empty array with 200 if no bookings found
    if (!bookings.length) {
      return res.status(200).json([]);
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CANCEL booking
// CANCEL booking safely
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await HotelBooking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed booking' });
    }

    if (!booking.checkInDate) {
      return res.status(400).json({ message: 'Booking does not have a check-in date' });
    }

    const checkInDate = new Date(booking.checkInDate);
    const now = new Date();

    if (checkInDate <= now) {
      return res.status(400).json({ message: 'Cannot cancel booking on or after check-in date' });
    }

    // Optional: apply cancellation fee
    let cancellationFee = 0;
    const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
    if (hoursUntilCheckIn < 24) {
      cancellationFee = booking.totalAmount * 0.1; // 10% fee
    }

    // Update booking
    await booking.update({
      status: 'cancelled',
      cancellationFee,
      cancelledAt: new Date()
    });

    res.json({
      message: 'Booking cancelled successfully',
      booking,
      cancellationFee
    });

  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};


exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching bookings for userId:', userId);

    const bookings = await HotelBooking.findAll({
      where: { userId },
      include: [
        { model: Hotel, as: 'Hotel' },
        { model: Room, as: 'Room' }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log('Found bookings:', bookings);

    // Change: Return empty array with 200 if no bookings found
    if (!bookings.length) {
      return res.status(200).json([]);
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// GET booking statistics
exports.getBookingStats = async (req, res) => {
  try {
    const { hotelId, startDate, endDate } = req.query;
    
    const whereCondition = {};
    
    if (hotelId) {
      whereCondition.hotelId = hotelId;
    }
    
    if (startDate && endDate) {
      whereCondition.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const stats = await HotelBooking.findAll({
      where: whereCondition,
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', '*'), 'count'],
        [require('sequelize').fn('SUM', require('sequelize').col('totalAmount')), 'totalRevenue']
      ],
      group: ['status']
    });

    const totalBookings = await HotelBooking.count({ where: whereCondition });
    const totalRevenue = await HotelBooking.sum('totalAmount', { 
      where: { ...whereCondition, status: 'confirmed' } 
    });

    res.json({
      totalBookings,
      totalRevenue: totalRevenue || 0,
      statusBreakdown: stats
    });
  } catch (err) {
    console.error('Get booking stats error:', err);
    res.status(500).json({ message: 'Error fetching booking statistics', error: err.message });
  }
};
