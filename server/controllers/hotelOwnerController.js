// Enhanced Hotel Owner Controller with full management features
const { Hotel, Location, Room, HotelBooking, User, Housekeeping, RoomCategory } = require('../models');
const { Op } = require('sequelize');

// 1. DASHBOARD FUNCTIONALITY
exports.getDashboard = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Total bookings
    const totalBookings = await HotelBooking.count({
      where: { hotelId: hotel.id }
    });

    // Monthly income
    const monthlyIncome = await HotelBooking.sum('totalAmount', {
      where: {
        hotelId: hotel.id,
        createdAt: { [Op.gte]: startOfMonth },
        status: 'confirmed'
      }
    });

    // Available rooms
    const totalRooms = await Room.count({
      where: { hotelId: hotel.id }
    });

    const occupiedRooms = await HotelBooking.count({
      where: {
        hotelId: hotel.id,
        checkInDate: { [Op.lte]: today },
        checkOutDate: { [Op.gte]: today },
        status: 'confirmed'
      }
    });

    // Today's check-ins and check-outs
    const todayCheckIns = await HotelBooking.findAll({
      where: {
        hotelId: hotel.id,
        checkInDate: { [Op.between]: [startOfDay, endOfDay] },
        status: 'confirmed'
      },
      include: [{ model: User, attributes: ['username', 'email', 'phone'] }]
    });

    const todayCheckOuts = await HotelBooking.findAll({
      where: {
        hotelId: hotel.id,
        checkOutDate: { [Op.between]: [startOfDay, endOfDay] },
        status: 'confirmed'
      },
      include: [{ model: User, attributes: ['username', 'email', 'phone'] }]
    });

    // Pending reservations
    const pendingReservations = await HotelBooking.count({
      where: {
        hotelId: hotel.id,
        status: 'pending'
      }
    });

    // Alerts
    const alerts = [];
    const availableRooms = totalRooms - occupiedRooms;
    if (availableRooms < 3) {
      alerts.push({ type: 'warning', message: `Low room availability: Only ${availableRooms} rooms available` });
    }

    // Maintenance reminders
    const maintenanceRooms = await Room.count({
      where: { hotelId: hotel.id, status: 'maintenance' }
    });
    if (maintenanceRooms > 0) {
      alerts.push({ type: 'info', message: `${maintenanceRooms} rooms under maintenance` });
    }

    res.json({
      overview: {
        totalBookings,
        monthlyIncome: monthlyIncome || 0,
        availableRooms,
        currentGuests: occupiedRooms
      },
      quickInsights: {
        todayCheckIns,
        todayCheckOuts,
        pendingReservations
      },
      alerts
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// 2. HOUSEKEEPING FUNCTIONALITY
exports.getHousekeepingStatus = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const rooms = await Room.findAll({
      where: { hotelId: hotel.id },
      include: [{
        model: Housekeeping,
        required: false,
        where: {
          date: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }]
    });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching housekeeping status:', error);
    res.status(500).json({ error: 'Failed to fetch housekeeping status' });
  }
};

exports.assignHousekeeper = async (req, res) => {
  const { roomId, housekeeperName, scheduledTime } = req.body;
  const ownerId = req.user.id;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const room = await Room.findOne({
      where: { id: roomId, hotelId: hotel.id }
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const housekeeping = await Housekeeping.create({
      roomId,
      housekeeperName,
      scheduledTime,
      status: 'assigned',
      date: new Date()
    });

    res.status(201).json(housekeeping);
  } catch (error) {
    console.error('Error assigning housekeeper:', error);
    res.status(500).json({ error: 'Failed to assign housekeeper' });
  }
};

exports.updateCleaningStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  try {
    const housekeeping = await Housekeeping.findByPk(id);
    if (!housekeeping) {
      return res.status(404).json({ error: 'Housekeeping record not found' });
    }

    await housekeeping.update({ status, notes, completedAt: new Date() });

    // Update room status based on cleaning status
    if (status === 'completed') {
      await Room.update(
        { cleaningStatus: 'clean' },
        { where: { id: housekeeping.roomId } }
      );
    }

    res.json(housekeeping);
  } catch (error) {
    console.error('Error updating cleaning status:', error);
    res.status(500).json({ error: 'Failed to update cleaning status' });
  }
};

// 3. ROOMS MANAGEMENT
exports.getRooms = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const rooms = await Room.findAll({
      where: { hotelId: hotel.id },
      include: [{ model: RoomCategory, as: 'RoomCategory', attributes: ['name', 'description'] }]
    });

    // Add images field to each room (if not already present)
    const formattedRooms = rooms.map(room => {
      let images = [];
      if (room.images) {
        if (Array.isArray(room.images)) {
          images = room.images;
        } else if (typeof room.images === 'string') {
          try {
            images = JSON.parse(room.images);
          } catch {
            images = [room.images];
          }
        }
      }
      return {
        ...room.toJSON(),
        images
      };
    });

    res.json(formattedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

exports.createRoom = async (req, res) => {
  const ownerId = req.user.id;
  const { roomNumber, type, amenities, images, pricePerNight, categoryId, maxOccupancy } = req.body;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const room = await Room.create({
      hotelId: hotel.id,
      roomNumber,
      type,
      amenities,
      images,
      pricePerNight,
      categoryId,
      maxOccupancy,
      status: 'available',
      cleaningStatus: 'clean'
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;
  const updateData = req.body;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const room = await Room.findOne({
      where: { id, hotelId: hotel.id }
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await room.update(updateData);
    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const room = await Room.findOne({
      where: { id, hotelId: hotel.id }
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await room.destroy();
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
};

exports.setRoomAvailability = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // available, maintenance, occupied
  const ownerId = req.user.id;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const room = await Room.findOne({
      where: { id, hotelId: hotel.id }
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await room.update({ status });
    res.json({ message: `Room status updated to ${status}` });
  } catch (error) {
    console.error('Error updating room availability:', error);
    res.status(500).json({ error: 'Failed to update room availability' });
  }
};

// 4. RESERVATIONS MANAGEMENT
exports.getReservations = async (req, res) => {
  const ownerId = req.user.id;
  const { status, startDate, endDate } = req.query;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const whereCondition = { hotelId: hotel.id };
    
    if (status) {
      whereCondition.status = status;
    }
    
    if (startDate && endDate) {
      whereCondition.checkInDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const reservations = await HotelBooking.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ['username', 'email', 'phone'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ],
      order: [['checkInDate', 'ASC']]
    });

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

exports.updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const ownerId = req.user.id;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const reservation = await HotelBooking.findOne({
      where: { id, hotelId: hotel.id }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.update({ status, notes });
    res.json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

// 5. BOOKING OVERVIEW
exports.getBookingCalendar = async (req, res) => {
  const ownerId = req.user.id;
  const { month, year } = req.query;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const startDate = new Date(year || new Date().getFullYear(), (month || new Date().getMonth()) - 1, 1);
    const endDate = new Date(year || new Date().getFullYear(), month || new Date().getMonth(), 0);

    const bookings = await HotelBooking.findAll({
      where: {
        hotelId: hotel.id,
        [Op.or]: [
          {
            checkInDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            checkOutDate: {
              [Op.between]: [startDate, endDate]
            }
          }
        ]
      },
      include: [
        { model: User, attributes: ['username'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching booking calendar:', error);
    res.status(500).json({ error: 'Failed to fetch booking calendar' });
  }
};

exports.getRoomOccupancyTimeline = async (req, res) => {
  const ownerId = req.user.id;
  const { startDate, endDate } = req.query;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const rooms = await Room.findAll({
      where: { hotelId: hotel.id },
      include: [{
        model: HotelBooking,
        where: {
          [Op.or]: [
            {
              checkInDate: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
              }
            },
            {
              checkOutDate: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
              }
            }
          ]
        },
        required: false,
        include: [{ model: User, attributes: ['username'] }]
      }]
    });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching room occupancy timeline:', error);
    res.status(500).json({ error: 'Failed to fetch room occupancy timeline' });
  }
};

exports.downloadBookingReport = async (req, res) => {
  const ownerId = req.user.id;
  const { format, startDate, endDate } = req.query;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const bookings = await HotelBooking.findAll({
      where: {
        hotelId: hotel.id,
        checkInDate: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Room, attributes: ['roomNumber', 'type'] }
      ]
    });

    if (format === 'csv') {
      const csv = bookings.map(booking => ({
        'Booking ID': booking.id,
        'Guest Name': booking.User.username,
        'Email': booking.User.email,
        'Room': booking.Room.roomNumber,
        'Room Type': booking.Room.type,
        'Check In': booking.checkInDate,
        'Check Out': booking.checkOutDate,
        'Total Amount': booking.totalAmount,
        'Status': booking.status
      }));
      
      res.json({ data: csv, format: 'csv' });
    } else {
      res.json({ data: bookings, format: 'json' });
    }
  } catch (error) {
    console.error('Error generating booking report:', error);
    res.status(500).json({ error: 'Failed to generate booking report' });
  }
};

// Room Categories Management
exports.getRoomCategories = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const categories = await RoomCategory.findAll({
      where: { hotelId: hotel.id }
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching room categories:', error);
    res.status(500).json({ error: 'Failed to fetch room categories' });
  }
};

exports.createRoomCategory = async (req, res) => {
  const ownerId = req.user.id;
  const { name, description, basePrice } = req.body;
  
  try {
    const hotel = await Hotel.findOne({ where: { ownerId } });
    if (!hotel) {
      return res.status(404).json({ error: 'No hotel found' });
    }

    const category = await RoomCategory.create({
      hotelId: hotel.id,
      name,
      description,
      basePrice
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating room category:', error);
    res.status(500).json({ error: 'Failed to create room category' });
  }
};
const getAssociationAlias = (Model, TargetModel) => {
  const association = Object.values(Model.associations).find(
    assoc => assoc.target === TargetModel
  );
  return association ? association.as : null;
};

exports.getRoomById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const alias = getAssociationAlias(Room, RoomCategory);

    console.log("Detected alias:", alias);

    if (!alias) {
      return res.status(500).json({ message: 'Association alias not found' });
    }

    const room = await Room.findOne({
      where: { id: roomId },
      include: [
        {
          model: RoomCategory,
          as: alias
        }
      ]
    });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Add images field to the room (if not already present)
    let images = [];
    if (room.images) {
      if (Array.isArray(room.images)) {
        images = room.images;
      } else if (typeof room.images === 'string') {
        try {
          images = JSON.parse(room.images);
        } catch {
          images = [room.images];
        }
      }
    }

    res.status(200).json({
      ...room.toJSON(),
      images
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: error.message });
  }
};

// exports.getHousekeepingByRoom = async (req, res) => {
//   try {
//     const roomId = req.params.roomId;
//     const hotelId = req.user.hotelId; // From JWT middleware
//     const housekeeping = await Housekeeping.findAll({
//         where: {
//             roomId: roomId,
//             hotelId: hotelId, // Ensure the housekeeping belongs to this hotel owner
//         },
//         order: [['date', 'DESC']],
//     });
//     if (!housekeeping) {
//         return res.status(404).json({ message: 'Housekeeping records not found or access denied' });
//     }
//     res.json(housekeeping);
//   } catch (error) {
//     console.error('Error fetching housekeeping records:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   } 
// };