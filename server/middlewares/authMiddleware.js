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
 if (req.user.role !== 'admin' && req.user.role !== 'restaurant_owner'&& req.user.role !== 'hotel_owner' ) {
  return res.sendStatus(403)
}
  next();
};
