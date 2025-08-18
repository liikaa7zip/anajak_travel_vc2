const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token and attach decoded user info to req.user
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1]; // expecting format: 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Decoded token:', {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });
    }

    req.user = decoded; // user info like id, role etc.
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to allow only admin users
exports.verifyAdmin = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('verifyAdmin - req.user:', {
      id: req.user?.id,
      role: req.user?.role,
    });
  }

  if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admin only.' });
};

// Middleware to allow only hotel owners
exports.verifyHotelOwner = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const role = req.user.role.toString().toLowerCase();

  // Accept variants like hotelowner, hotel_owner, HotelOwner
  if (role === 'hotel_owner' || role === 'hotelowner') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Hotel owner only.' });
};

// Middleware to allow only restaurant owners
exports.verifyRestaurantOwner = (req, res, next) => {
  if (req.user && req.user.role && req.user.role.toLowerCase() === 'restaurant_owner') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Restaurant owner only.' });
};

// Middleware to allow admin or restaurant owner
exports.verifyAdminOrRestaurantOwner = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'restaurant_owner'|| req.user.role === 'transport_owner' )) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin or Restaurant Owner only' });
};
