  const { Hotel, Location } = require('../models');

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
            attributes: ['name'],
          },
        ],
      });

      const formattedHotels = hotels.map((hotel) => ({
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
        include: [{ model: Location, attributes: ['name'] }],
      });
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.json({
        id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        pricePerNight: hotel.pricePerNight,
        imageUrl: hotel.imageUrl,
        locationId: hotel.locationId,
        locationName: hotel.Location ? hotel.Location.name : null,
      });
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ error: 'Failed to fetch hotel' });
    }
  };

  exports.createHotel = async (req, res) => {
    const { name, description, pricePerNight, imageUrl, locationId } = req.body;

    try {
      const newHotel = await Hotel.create({
        name,
        description,
        pricePerNight,
        imageUrl,
        locationId,
      });

      res.status(201).json(newHotel);
    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({ error: 'Failed to create hotel' });
    }
  };

  exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, description, pricePerNight, imageUrl, locationId } = req.body;

    try {
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      await hotel.update({ name, description, pricePerNight, imageUrl, locationId });
      res.json(hotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(500).json({ error: 'Failed to update hotel' });
    }
  };

  exports.deleteHotel = async (req, res) => {
    const { id } = req.params;

    try {
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      await hotel.destroy();
      res.json({ message: 'Hotel deleted' });
    } catch (error) {
      console.error('Error deleting hotel:', error);
      res.status(500).json({ error: 'Failed to delete hotel' });
    }
  };
