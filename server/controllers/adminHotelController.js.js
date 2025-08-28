const { Hotel, Location, User } = require('../models');



exports.createHotel = async (req, res) => {
  try {
    const { name, description, pricePerNight, imageUrl, locationId, ownerEmail, hasRestaurant } = req.body;

    // Find owner by email
    const owner = await User.findOne({
      where: { email: ownerEmail, role: 'hotel_owner' }
    });

    if (!owner) {
      return res.status(400).json({ error: 'Invalid hotel owner email or not a hotel owner' });
    }

    const newHotel = await Hotel.create({
      name,
      description,
      pricePerNight,
      imageUrl,
      locationId,
      ownerId: owner.id,
      amenities: { hasRestaurant: !!hasRestaurant } // store as boolean in JSON
    });

    res.status(201).json({
      message: 'Hotel created successfully',
      hotel: newHotel
    });

  } catch (error) {
    console.error('[CREATE HOTEL] Error:', error);
    res.status(500).json({ error: 'Failed to create hotel' });
  }
};



exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, description, pricePerNight, imageUrl, locationId, ownerId, hasRestaurant } = req.body;

  try {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    if (ownerId) {
      const owner = await User.findByPk(ownerId);
      if (!owner || owner.role !== 'hotel_owner') {
        return res.status(400).json({ error: 'Invalid hotel owner' });
      }
    }

    await hotel.update({
      name,
      description,
      pricePerNight,
      imageUrl,
      locationId,
      ownerId,
      amenities: { ...hotel.amenities, hasRestaurant: !!hasRestaurant } // update or add hasRestaurant
    });

    res.json(hotel);
  } catch (error) {
    console.error('[UPDATE HOTEL] Error:', error);
    res.status(500).json({ error: 'Failed to update hotel' });
  }
};


exports.deleteHotel = async (req, res) => {
    const { id } = req.params;
    console.log('[DELETE HOTEL] Params ID:', id);

    try {
        const hotel = await Hotel.findByPk(id);
        console.log('[DELETE HOTEL] Found hotel:', hotel);

        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }

        await hotel.destroy();
        console.log('[DELETE HOTEL] Hotel deleted:', id);
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error('[DELETE HOTEL] Error:', error);
        res.status(500).json({ error: 'Failed to delete hotel' });
    }
};
exports.getAllHotels = async (req, res) => {
  const { locationId } = req.query;
  try {
    const whereCondition = {};
    if (locationId) {
      whereCondition.locationId = locationId;
    }

    const hotels = await Hotel.findAll({
      where: whereCondition,
      include: [
        {
          model: Location,
          as: 'Location', // must match alias in association
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'owner', // must match alias in association
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Internal server error' });
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
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
