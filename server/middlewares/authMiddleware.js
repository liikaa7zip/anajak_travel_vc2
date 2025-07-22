// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

module.exports = {
  // Middleware to authenticate user by JWT token
  authenticate: async (req, res, next) => {
    try {
      // 1. Get token from Authorization header ("Bearer TOKEN")
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // 2. Verify token with secret key from environment variables
      const secretKey = 'your-secret-key'; // REPLACE with your own secret
      const decoded = jwt.verify(token, secretKey);


      // 3. Fetch user by ID from token payload, exclude password
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid token: user not found' });
      }

      // 4. Attach user to request object for downstream handlers
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Please authenticate' });
    }
  },

  // Middleware to authorize based on roles (array of allowed roles)
  authorize: (roles = []) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }
      next();
    };
  }
};
