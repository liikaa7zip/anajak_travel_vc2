// Booking Validation Middleware
const { body, validationResult } = require('express-validator');

exports.validateBookingCreation = [
  body('hotelId')
    .isInt({ min: 1 })
    .withMessage('Hotel ID must be a positive integer'),
  
  body('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  body('roomId')
    .isInt({ min: 1 })
    .withMessage('Room ID must be a positive integer'),
  
  body('checkInDate')
    .isISO8601()
    .withMessage('Check-in date must be a valid date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Check-in date cannot be in the past');
      }
      return true;
    }),
  
  body('checkOutDate')
    .isISO8601()
    .withMessage('Check-out date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkInDate)) {
        throw new Error('Check-out date must be after check-in date');
      }
      return true;
    }),
  
  body('guests')
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of guests must be between 1 and 10'),
  
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

exports.validateStatusUpdate = [
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed', 'no-show'])
    .withMessage('Invalid status value'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];
