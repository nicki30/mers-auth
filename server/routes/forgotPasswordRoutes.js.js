// routes/forgotPasswordRoutes.js
const express = require('express');
const router = express.Router();
const { forgotPassword } = require('../controllers/forgotPasswordController');

// Ruta para manejar la solicitud de restablecimiento de contraseña
router.post('/forgotPassword', forgotPassword);

module.exports = router;
