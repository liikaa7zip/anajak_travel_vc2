// // C:\Users\Panha.Nhean\Desktop\Anajak_Travel_VC2\server\routes\userRoutes.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.post('/register', userController.createUser);
// router.post('/login', userController.loginUser);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;


// === server/routes/userRoutes.js ===
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router