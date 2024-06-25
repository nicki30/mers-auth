const express = require('express');
const router = express.Router();
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { test, registerUser, loginUser } = require('../controllers/authController');
const verificarToken = require ('../middleware/verificarToken');

// Middleware CORS para permitir solicitudes desde http://localhost:5173
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

// Middleware para validar el formato de correo electrónico
const validateEmailFormat = (value) => {
    if (!/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es|org)$/i.test(value)) {
        throw new Error('El correo electrónico debe ser de Gmail, Outlook o Hotmail');
    }
    return true;
};

// Middleware para validar la contraseña
const validatePasswordFormat = (value) => {
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:<,.>?])(?=.*[a-z]).{8,}/.test(value)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial');
    }
    return true;
};

// Ruta de prueba para verificar si el servidor está funcionando
router.get('/', test);

// Ruta para registrar nuevos usuarios
router.post(
    '/register',
    [
        // Validaciones de campos usando express-validator
        body('name').notEmpty().withMessage('El nombre es requerido'),
        body('email').notEmpty().withMessage('El correo electrónico es requerido').bail().isEmail().withMessage('El correo electrónico no es válido').bail().custom(validateEmailFormat),
        body('password').notEmpty().withMessage('La contraseña es requerida').bail().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail().custom(validatePasswordFormat)
    ],
    registerUser
);

// Ruta para iniciar sesión de usuarios existentes
router.post(
    '/login',
    [
        // Validaciones de campos usando express-validator
        body('email').notEmpty().withMessage('El correo electrónico es requerido').bail().isEmail().withMessage('El correo electrónico no es válido'),
        body('password').notEmpty().withMessage('La contraseña es requerida')
    ],
    loginUser
);

// Ruta protegida: Ejemplo de ruta que requiere token JWT para acceder
router.get('/rutaProtegida', verificarToken, (req, res) => {
    // Si se pasa la verificación del token, se puede proceder
    res.json({ mensaje: 'Esta es una ruta protegida' });
});

module.exports = router;

