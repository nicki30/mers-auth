// // En resetPasswordController.js

// const User = require('../models/user'); // Importa tu modelo de usuario correspondiente
// const { comparePassword, hashPassword } = require('../helpers/auth'); // Importa las funciones de hash y comparación de contraseñas

// // Controlador para restablecer la contraseña
// exports.resetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     try {
//         // Buscar al usuario por el token de reseteo de contraseña
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
//         }

//         // Hashear la nueva contraseña
//         const hashedPassword = await hashPassword(password);

//         // Actualizar la contraseña del usuario
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         // Enviar una respuesta de éxito
//         res.json({ success: true, message: 'Contraseña actualizada exitosamente.' });
//     } catch (error) {
//         console.error('Error al resetear contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al resetear contraseña. Por favor, inténtalo de nuevo más tarde.' });
//     }
// };

// Importa el modelo de usuario y otras dependencias necesarias
const User = require('../models/user');
const { hashPassword } = require('../helpers/auth');

// Controlador para restablecer la contraseña
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Buscar al usuario por el token de reseteo de contraseña
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // Si no se encuentra un usuario válido con el token
        if (!user) {
            return res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await hashPassword(password);

        // Actualizar la contraseña del usuario y limpiar los campos de reseteo
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Enviar una respuesta de éxito
        res.json({ success: true, message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al resetear contraseña:', error);
        res.status(500).json({ success: false, message: 'Error al resetear contraseña. Por favor, inténtalo de nuevo más tarde.' });
    }
};
