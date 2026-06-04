const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { handleValidationErrors } = require('../middlewares/errorMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

// POST /api/auth/register
router.post('/register', registerValidator, handleValidationErrors, authController.register.bind(authController));

// POST /api/auth/login
router.post('/login', loginValidator, handleValidationErrors, authController.login.bind(authController));

// POST /api/auth/logout
router.post('/logout', authenticate, authController.logout.bind(authController));

module.exports = router;
