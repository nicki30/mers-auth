// routes/admin.js

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user'); // Ajusta la ruta según tu estructura de archivos

// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    // Verifica si el usuario está autenticado
    if (req.isAuthenticated()) {
        // Verifica si el usuario es administrador
        if (req.user.isAdmin) {
            return next(); // Permite el acceso si es administrador
        } else {
            return res.status(403).send('Acceso denegado. Requiere permisos de administrador.');
        }
    } else {
        return res.status(401).send('Acceso no autorizado. Debes iniciar sesión.');
    }
}

// Ruta protegida para administradores: /admin/users (ejemplo)
router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find(); // Obtén todos los usuarios
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
