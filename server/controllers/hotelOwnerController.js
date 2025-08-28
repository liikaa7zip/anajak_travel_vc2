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

  // 2. HOUSEKEEPING FUNCTIONALITY\\

  exports.getAllHousekeeping = async (req, res) => {
    const ownerId = req.user.id;
    try {
      const hotel = await Hotel.findOne({ where: { ownerId } });
      if (!hotel) return res.status(404).json({ error: 'No hotel found' });

      const records = await Housekeeping.findAll({
        include: [
          {
            model: Room,
            where: { hotelId: hotel.id },
            attributes: ['id', 'roomNumber', 'type', 'status', 'cleaningStatus']
          }
        ],
        order: [['date', 'DESC']]
      });

      res.json(records);
    } catch (error) {
      console.error('Error fetching housekeeping records:', error);
      res.status(500).json({ error: 'Failed to fetch housekeeping records' });
    }};
  exports.getHousekeepingById = async (req, res) => {
    const { id } = req.params;
    try { 
      const housekeeping = await Housekeeping.findByPk(id, {
        include: [{ model: Room, attributes: ['roomNumber', 'type', 'status', 'cleaningStatus'] }]
      });

      if (!housekeeping) {
        return res.status(404).json({ error: 'Housekeeping record not found' });
      }

      res.json(housekeeping);
    } catch (error) {
      console.error('Error fetching housekeeping detail:', error);
      res.status(500).json({ error: 'Failed to fetch housekeeping record' });
    }
  };

  // ✅ Get housekeeping tasks (with pagination, search, status filter)
  exports.getHousekeepingStatus = async (req, res) => {
    const ownerId = req.user.id;
    const { page = 1, limit = 10, search = '', status } = req.query;

    try {
      // 1. Find hotel by owner
      const hotel = await Hotel.findOne({ where: { ownerId } });
      if (!hotel) return res.status(404).json({ error: 'No hotel found' });

      // 2. Build filter conditions
      const whereCondition = {
        hotelId: hotel.id
      };

      if (status) {
        whereCondition['$Housekeepings.status$'] = status;
      }

      if (search) {
        whereCondition[Op.or] = [
          { '$Room.roomNumber$': { [Op.like]: `%${search}%` } },
          { '$Housekeepings.housekeeperName$': { [Op.like]: `%${search}%` } }
        ];
      }

      // 3. Query rooms with housekeeping
      const { count, rows } = await Room.findAndCountAll({
        where: { hotelId: hotel.id },
        include: [
          {
            model: Housekeeping,
            required: false,
          }
        ],
        where: whereCondition,
        offset: (page - 1) * limit,
        limit: parseInt(limit),
        order: [['id', 'ASC']]
      });

      res.json({
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        data: rows
      });

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
    // Accept status, notes, and housekeeperName for "Get" action
    const { status, notes, housekeeperName } = req.body;

    try {
      const housekeeping = await Housekeeping.findByPk(id);
      if (!housekeeping) {
        return res.status(404).json({ error: 'Housekeeping record not found' });
      }

      // Only update housekeeperName if provided
      await housekeeping.update({
        status,
        notes,
        housekeeperName: housekeeperName !== undefined ? housekeeperName : housekeeping.housekeeperName,
        completedAt: status === 'completed' ? new Date() : housekeeping.completedAt
      });

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
  // 3. ROOMS MANAGEMENT - Hotel Owner Only
  exports.getRooms = async (req, res) => {
    const ownerId = req.user.id;

    try {
      // Find the hotel owned by the current user
      const hotel = await Hotel.findOne({ where: { ownerId } });

      if (!hotel) {
        return res.status(404).json({ error: 'No hotel found for this owner' });
      }

      // Fetch all rooms for this hotel, including their category
      const rooms = await Room.findAll({
        where: { hotelId: hotel.id },
        include: [
          {
            model: RoomCategory,
            as: 'RoomCategory',
            attributes: ['name', 'description'],
          },
        ],
      });

      // Format images and amenities properly
      const formattedRooms = rooms.map(room => {
        let images = [];
        let amenities = [];

        // Handle images
        if (room.images) {
          if (Array.isArray(room.images)) images = room.images;
          else if (typeof room.images === 'string') {
            try {
              images = JSON.parse(room.images);
            } catch {
              images = [room.images];
            }
          }
        }

        // Handle amenities
        if (room.amenities) {
          if (Array.isArray(room.amenities)) amenities = room.amenities;
          else if (typeof room.amenities === 'string') {
            try {
              amenities = JSON.parse(room.amenities);
            } catch {
              amenities = [room.amenities];
            }
          }
        }

        return {
          ...room.toJSON(),
          images,
          amenities,
        };
      });

      res.json(formattedRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  };

  // GET available rooms for users
  exports.getRoomsForUsers = async (req, res) => {
    try {
      const { hotelId } = req.params;

      if (!hotelId) {
        return res.status(400).json({ message: 'Hotel ID is required' });
      }

      // 1. Find all rooms in this hotel
      const allRooms = await Room.findAll({
        where: { hotelId },
        include: [
          { model: RoomCategory, attributes: ['name', 'description'] }
        ]
      });

      // 2. Find all bookings for this hotel with status pending/confirmed
      const bookedRooms = await HotelBooking.findAll({
        where: {
          hotelId,
          status: { [Op.in]: ['pending', 'confirmed'] }
        },
        attributes: ['roomId']
      });

      // 3. Make array of booked room IDs
      const bookedRoomIds = bookedRooms.map(b => b.roomId);

      // 4. Filter rooms that are NOT booked
      const availableRooms = allRooms.filter(room => !bookedRoomIds.includes(room.id));

      res.json(availableRooms);
    } catch (err) {
      console.error('Error fetching available rooms:', err);
      res.status(500).json({ message: 'Failed to fetch available rooms', error: err.message });
    }
  };

  exports.updateRoomStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // e.g., "available", "maintenance", "occupied"
    const ownerId = req.user.id;

    try {
      // Find the hotel owned by the current user
      const hotel = await Hotel.findOne({ where: { ownerId } });
      if (!hotel) {
        return res.status(404).json({ error: 'No hotel found' });
      }

      // Find the room in this hotel
      const room = await Room.findOne({
        where: { id, hotelId: hotel.id }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Update room status
      await room.update({ status });

      res.json({
        message: `Room status updated to ${status}`,
        room
      });
    } catch (err) {
      console.error('Error updating room status:', err);
      res.status(500).json({ message: 'Failed to update room status' });
    }
  };

  exports.getHotelRooms = async (req, res) => {
    try {
      const hotelId = req.params.hotelId;

      const rooms = await Room.findAll({
        where: { hotelId },
        include: [
          { model: RoomCategory, as: 'RoomCategory', attributes: ['name', 'description'] }
        ]
      });

      const formattedRooms = rooms.map(room => {
        let images = [];
        let amenities = [];

        if (room.images) {
          images = Array.isArray(room.images) ? room.images : JSON.parse(room.images || '[]');
        }
        if (room.amenities) {
          amenities = Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]');
        }

        return { ...room.toJSON(), images, amenities };
      });

      res.json(formattedRooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch rooms' });
    }
  };

  exports.createRoom = async (req, res) => {
    try {
      const ownerId = req.user.id;
      const hotel = await Hotel.findOne({ where: { ownerId } });
      if (!hotel) return res.status(403).json({ message: 'No hotel assigned to you' });

      const { roomNumber, type, amenities, pricePerNight, categoryId, maxOccupancy } = req.body;

      // Map uploaded files to paths
      const imagePaths = req.files.map(file => '/uploads/' + file.filename);

      const room = await Room.create({
        hotelId: hotel.id,
        roomNumber,
        type,
        amenities: JSON.parse(amenities),
        images: imagePaths,
        pricePerNight,
        categoryId,
        maxOccupancy
      });

      res.status(201).json(room);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create room' });
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
  exports.getReservations = async (req, res) => {const ownerId = req.user.id;
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
    } catch(error) {
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
  try {
    const hotelId = req.user.id; // logged-in owner
    const categories = await RoomCategory.findAll({
      where: { hotelId } // only this owner’s categories
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch room categories.' });
  }
};

  exports.createRoomCategory = async (req, res) => {
  try {
    const hotelId = req.user.id; // ensure category belongs to this owner
    const { name, description, basePrice } = req.body;

    if (!name || !basePrice) {
      return res.status(400).json({ message: 'Name and basePrice are required.' });
    }

    const newCategory = await RoomCategory.create({
      hotelId,
      name,
      description,
      basePrice
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create room category.' });
  }
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
        }}

      res.status(200).json({
        ...room.toJSON(),
        images
      });
    } catch (error) {
      console.error('Error fetching room:', error);
      res.status(500).json({ message: error.message });
    }
  };