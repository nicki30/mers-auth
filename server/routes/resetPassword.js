// En resetPasswordRoutes.js

const express = require('express');
const router = express.Router();
const { resetPassword } = require(''); // Importa el controlador ojo!!

// Ruta para restablecer la contraseña
router.post('/reset/:token', resetPassword);

module.exports = router;
