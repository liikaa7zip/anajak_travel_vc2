const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.verifyAdmin = (req, res, next) => {
 if (req.user.role !== 'admin'  ) {
  return res.sendStatus(403)
}
  next();
};

exports.verifyRestaurantOwner = (req, res, next) => {
  if (req.user && req.user.role === 'restaurant_owner') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Restaurant owner only.' });
  }
};
exports.verifyAdminOrRestaurantOwner = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'restaurant_owner')) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin or Restaurant Owner only' });
};

