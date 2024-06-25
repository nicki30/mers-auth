const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT en las solicitudes.
 * Este middleware verifica si hay un token válido en el encabezado de autorización.
 * Si el token es válido, decodifica la información del usuario y la agrega a req.usuario.
 * Si el token no es válido o no está presente, devuelve un error.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
const verificarToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.header('Authorization');
    
    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar y decodificar el token usando el secreto JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregar la información decodificada del usuario a la solicitud
        req.usuario = decoded;
        
        // Pasar al siguiente middleware
        next();
    } catch (error) {
        // Manejar errores de token inválido
        console.error('Error al verificar el token:', error);
        return res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = verificarToken;
