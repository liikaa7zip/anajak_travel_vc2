const { Food, Location, Category } = require('../models');

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
    const { name, price, image, locationId, categoryId } = req.body;

    if (!name || !price || !locationId || !categoryId) {
      return res.status(400).json({ error: 'Name, price, locationId, and categoryId are required' });
    }

    const food = await Food.create({
      name,
      price,
      image,
      locationId,
      categoryId
    });

    res.status(201).json(food);
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ error: 'Failed to create food' });
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