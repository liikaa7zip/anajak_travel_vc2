// // controllers/userController.js
// const db = require('../models');
// const bcrypt = require('bcrypt');
// const saltRounds = 10; // Adjust based on your security requirements
// const jwt = require('jsonwebtoken'); // Add for token generation
// const User = db.User;

// const secretKey = 'your-secret-key'; // Replace with a secure secret key (e.g., from .env)

// // CREATE - Register new user
// exports.createUser = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
    
//     if (!email || !password || !username) {
//       return res.status(400).json({ message: 'Username, email, and password are required' });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already in use' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await User.create({ 
//       username,
//       email, 
//       password: hashedPassword, 
//       role: role || 'student'
//     });

//     const { password: _, ...userWithoutPassword } = newUser.toJSON();
//     res.status(201).json(userWithoutPassword);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // LOGIN - Authenticate user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

//     const { password: _, ...userWithoutPassword } = user.toJSON();
//     res.json({ user: userWithoutPassword, token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // READ - Get all users (admin only)
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: { exclude: ['password'] } // Never return passwords
//     });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // READ - Get single user
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       attributes: { exclude: ['password'] }
//     });
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE - Update user
// exports.updateUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const { username, email, role } = req.body;
    
//     // Prevent email updates to existing accounts
//     if (email && email !== user.email) {
//       return res.status(400).json({ message: 'Email cannot be changed' });
//     }

//     await user.update({ 
//       username: username || user.username,
//       name: username || user.name, // Assuming name and username are interchangeable here
//       role: role || user.role
//     });

//     const { password: _, ...updatedUser } = user.toJSON();
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE - Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     await user.destroy();
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register user
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login', error: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get users', error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user', error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

// Export all functions
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
