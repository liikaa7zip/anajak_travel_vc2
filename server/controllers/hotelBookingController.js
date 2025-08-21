// Enhanced Hotel Booking Controller
const { HotelBooking, Hotel, User, Room } = require('../models');
const { Op } = require('sequelize');

// GET all bookings with enhanced filtering
exports.getAllBookings = async (req, res) => {
  try {
    const { status, hotelId, userId, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    const whereCondition = {};
    
    // Apply filters
    if (status) {
      whereCondition.status = status;
    }
    
    if (hotelId) {
      whereCondition.hotelId = hotelId;
    }
    
    if (userId) {
      whereCondition.userId = userId;
    }
    
    if (startDate && endDate) {
      whereCondition.checkInDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // Pagination
    const offset = (page - 1) * limit;
    
    const { count, rows: bookings } = await HotelBooking.findAndCountAll({
      where: whereCondition,
      include: [
        { 
          model: Hotel, 
          attributes: ['id', 'name', 'imageUrl', 'pricePerNight'] 
        },
        { 
          model: User, 
          attributes: ['id', 'username', 'email', 'phone'] 
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
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
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
            { model: require('../models').Location, attributes: ['name'] }
          ]
        },
        { 
          model: User, 
          attributes: ['id', 'username', 'email', 'phone'] 
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
    console.log('Received booking request body:', req.body);
    
    const { 
      hotelId, 
      userId, 
      roomId,
      checkInDate, 
      checkOutDate, 
      guests, 
      totalAmount,
      specialRequests,
      paymentMethod 
    } = req.body;

    // Validate required fields
   if (
  hotelId === undefined || hotelId === null ||
  userId === undefined || userId === null ||
  roomId === undefined || roomId === null ||
  checkInDate === undefined || checkInDate === null ||
  checkOutDate === undefined || checkOutDate === null ||
  guests === undefined || guests === null ||
  totalAmount === undefined || totalAmount === null
) {
  return res.status(400).json({ 
    message: 'Missing required booking fields',
    required: ['hotelId', 'userId', 'roomId', 'checkInDate', 'checkOutDate', 'guests', 'totalAmount']
  });
}

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    
    if (checkIn < today) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }
    
    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Check if hotel exists
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Check if room exists and belongs to the hotel
    const room = await Room.findOne({
      where: { id: roomId, hotelId: hotelId }
    });
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found or does not belong to this hotel' });
    }

    // Check room availability
    const conflictingBooking = await HotelBooking.findOne({
      where: {
        roomId: roomId,
        status: { [Op.in]: ['confirmed', 'pending'] },
        [Op.or]: [
          {
            checkInDate: {
              [Op.between]: [checkIn, checkOut]
            }
          },
          {
            checkOutDate: {
              [Op.between]: [checkIn, checkOut]
            }
          },
          {
            [Op.and]: [
              { checkInDate: { [Op.lte]: checkIn } },
              { checkOutDate: { [Op.gte]: checkOut } }
            ]
          }
        ]
      }
    });

    if (conflictingBooking) {
      return res.status(409).json({ 
        message: 'Room is not available for the selected dates',
        conflictingBooking: {
          id: conflictingBooking.id,
          checkIn: conflictingBooking.checkInDate,
          checkOut: conflictingBooking.checkOutDate
        }
      });
    }

    // Check if guests exceed room capacity
    if (guests > room.maxOccupancy) {
      return res.status(400).json({ 
        message: `Number of guests (${guests}) exceeds room capacity (${room.maxOccupancy})` 
      });
    }

    // Calculate number of nights
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const calculatedAmount = nights * room.pricePerNight;

    // Validate total amount (allow some flexibility for taxes, fees)
    if (Math.abs(totalAmount - calculatedAmount) > calculatedAmount * 0.3) {
      return res.status(400).json({ 
        message: 'Total amount seems incorrect',
        calculated: calculatedAmount,
        provided: totalAmount
      });
    }

    // Create the booking
    const newBooking = await HotelBooking.create({
      hotelId,
      userId,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalAmount,
      specialRequests,
      status: 'pending', // Default status
      paymentMethod
    });

    // Update room status
const updateResult = await Room.update(
  { status: 'occupied' },
  { where: { id: roomId } }
);
console.log('Room update result:', updateResult);

    // Fetch the created booking with all relations
    const createdBooking = await HotelBooking.findByPk(newBooking.id, {
      include: [
        { model: Hotel, attributes: ['name', 'imageUrl'] },
        { model: User, attributes: ['username', 'email'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    res.status(201).json({message: 'Booking created successfully',
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



// CANCEL booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

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

    // Check cancellation policy (e.g., 24 hours before check-in)
    const checkInDate = new Date(booking.checkInDate);
    const now = new Date();
    const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);

    let cancellationFee = 0;
    if (hoursUntilCheckIn < 24) {
      cancellationFee = booking.totalAmount * 0.1; // 10% cancellation fee
    }

    await booking.update({ 
      status: 'cancelled',
      notes: reason || 'Cancelled by user',
      cancellationFee,
      cancelledAt: new Date()
    });

    const cancelledBooking = await HotelBooking.findByPk(id, {
      include: [
        { model: Hotel, attributes: ['name'] },
        { model: User, attributes: ['username', 'email'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    res.json({ 
      message: 'Booking cancelled successfully', 
      booking: cancelledBooking,
      cancellationFee
    });

  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};

// GET user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, upcoming } = req.query;

    const whereCondition = { userId };
    
    if (status) {
      whereCondition.status = status;
    }

    if (upcoming === 'true') {
      whereCondition.checkInDate = {
        [Op.gte]: new Date()
      };
    }

    const bookings = await HotelBooking.findAll({
      where: whereCondition,
      include: [
        { 
          model: Hotel, 
          attributes: ['id', 'name', 'imageUrl', 'pricePerNight'],
          include: [
            { model: require('../models').Location, attributes: ['name'] }
          ]
        },
        {
          model: Room,
          attributes: ['id', 'roomNumber', 'type', 'amenities']
        }
      ],
      order: [['checkInDate', 'DESC']]
    });

    res.json(bookings);
  } catch (err) {
    console.error('Get user bookings error:', err);
    res.status(500).json({ message: 'Error fetching user bookings', error: err.message });
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
