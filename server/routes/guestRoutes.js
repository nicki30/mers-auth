const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerGuest } = require('../controllers/guestController'); // Importar correctamente el controlador

// Middleware CORS para permitir solicitudes desde http://localhost:5173
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

// Ruta para manejar el registro de invitados
router.post('/register', registerGuest); // Usar registerGuest directamente

module.exports = router;
