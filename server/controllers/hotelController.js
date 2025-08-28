  // User Hotel Controller - For regular users to view hotels
  const { Hotel, Location, Room, RoomCategory } = require('../models');

exports.getAllHotels = async (req, res) => {
  const { locationId } = req.query;
  try {
    const whereCondition = {};
    if (locationId) whereCondition.locationId = locationId;

    const hotels = await Hotel.findAll({
      where: whereCondition,
      include: [
        {
          model: Location,
          as: 'Location',  // MUST match the alias in model
          attributes: ['name'],
        },
      ],
    });

    // Map to your desired format
    const formattedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      imageUrl: hotel.imageUrl,
      locationId: hotel.locationId,
      locationName: hotel.Location ? hotel.Location.name : null,
    }));

    res.json(formattedHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};


 exports.getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByPk(id, {
      include: [
        {
          model: Location,
          as: 'Location',
          attributes: ['name'],
        },
      ],
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Parse amenities if stored as JSON
    let amenities = {};
    let hasRestaurant = false;
    if (hotel.amenities) {
      try {
        amenities = typeof hotel.amenities === 'string' ? JSON.parse(hotel.amenities) : hotel.amenities;
        hasRestaurant = amenities.hasRestaurant === true || amenities.hasRestaurant === 'true';
      } catch (err) {
        console.warn('Failed to parse amenities JSON', err);
      }
    }

    res.json({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      imageUrl: hotel.imageUrl,
      locationId: hotel.locationId,
      locationName: hotel.Location ? hotel.Location.name : null,
      amenities,         // send amenities too if needed
      hasRestaurant      // ✅ send this field for Vue to use
    });

  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
};

exports.getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const rooms = await Room.findAll({
      where: { hotelId, status: 'available' },
      include: [{ model: RoomCategory, as: 'RoomCategory', attributes: ['name', 'description'] }]
    });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};
 
