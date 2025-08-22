const { Food, Location, Category, User } = require('../models');

exports.getAllFood = async (req, res) => {
  try {
    const locationId = req.query.locationId;  
    let whereCondition = {};

    if (locationId) {
      whereCondition.locationId = locationId;
    }

    const foods = await Food.findAll({
  where: whereCondition,
  include: [
    {
      model: Category,
      as: 'category',   // matches association
      attributes: ['id', 'name']
    },
    {
      model: Location,
      as: 'Location',   // ✅ match the alias exactly (capital L)
      attributes: ['id', 'name', 'country']
    }
  ]
});


    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch food' });
  }
};


exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, locationId } = req.body
    const image = req.file ? req.file.filename : null

    const food = await Food.findByPk(id)
    if (!food) {
      return res.status(404).json({ message: 'Food not found' })
    }

    food.name = name
    food.price = price
    food.locationId = locationId
    if (image) {
      food.image = image
    }

    await food.save()
    res.json({ message: 'Food updated successfully', food })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update food' })
  }
}
exports.getFoodById = async (req, res) => {
  try {
    console.log('Fetching food with ID:', req.params.id);

    const food = await Food.findByPk(req.params.id, {
      include: {
        model: Location,
        attributes: ['id', 'name', 'country'],
      },
    });

    if (!food) {
      console.log('Food not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    console.error('Error fetching food detail:', error);
    res.status(500).json({ error: 'Failed to fetch food detail' });
  }
};


exports.createFood = async (req, res) => {
  try {
    // 1. Fetch the full user from the database
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (user.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Only restaurant owners can add food' });
    }

    if (!user.hotelId) {
      return res.status(400).json({ error: 'Restaurant owner is not assigned to a hotel' });
    }

    // 2. Get food data from request body
    const { name, price, image, locationId, categoryId } = req.body;

    if (!name || !price || !locationId || !categoryId) {
      return res.status(400).json({ error: 'Name, price, locationId, and categoryId are required' });
    }

    // 3. Create the food item
    const food = await Food.create({
      name,
      price,
      image,
      locationId,
      categoryId,
      hotelId: user.hotelId,          // assign to the restaurant owner's hotel
      restaurantOwnerId: user.id      // track which owner added it
    });

    res.status(201).json(food);

  } catch (error) {
    console.error('[ADD FOOD ERROR]', error);
    res.status(500).json({ error: 'Failed to create food' });
  }
};


exports.toggleActive = async (req, res) => {
  try {
    const foodId = req.params.id;
    const userId = req.user.id; // from verifyToken middleware

    // Fetch the logged-in user
    const user = await User.findByPk(userId);

    if (!user || user.role !== 'restaurant_owner') {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Find the food by ID (any food, not restricted by restaurantOwnerId)
    const food = await Food.findByPk(foodId);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Toggle isActive
    food.isActive = !food.isActive;
    await food.save();

    return res.json({ message: `Food is now ${food.isActive ? 'Active' : 'Inactive'}`, food });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};




exports.getMyFoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user || user.role !== 'restaurant_owner') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const foods = await Food.findAll({
      where: { hotelId: user.hotelId },
      include: ['hotel', 'category']
    });

    res.json(foods);
  } catch (err) {
    console.error('[GET MY FOODS ERROR]', err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });

    await food.destroy();
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food' });
  }
};
exports.getFoodsByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const foods = await Food.findAll({ where: { locationId } });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch foods by location' });
  }
};


// Get all active foods for a specific hotel
exports.getFoodsByHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    const foods = await Food.findAll({
      where: { hotelId, isActive: true },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: Location,
          as: 'Location',
          attributes: ['id', 'name', 'country']
        }
      ]
    });

    if (!foods || foods.length === 0) {
      return res.status(404).json({ message: 'No foods found for this hotel' });
    }

    res.json(foods);

  } catch (err) {
    console.error('Error fetching foods by hotel:', err);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};


// Toggle Top Pick
exports.toggleTopPick = async (req, res) => {
  try {
    const foodId = req.params.id;
    const userId = req.user.id; // from auth middleware

    // Verify the user is a restaurant owner
    const user = await User.findByPk(userId);
    if (!user || user.role !== 'restaurant_owner') {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Find the food
    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Toggle isTopPick
    food.isTopPick = !food.isTopPick;
    await food.save();

    return res.json({
      message: `Food "${food.name}" is now ${food.isTopPick ? '⭐ Top Pick' : 'removed from Top Picks'}`,
      food,
    });
  } catch (err) {
    console.error("[TOGGLE TOP PICK ERROR]", err);
    res.status(500).json({ error: "Failed to update Top Pick status" });
  }
};