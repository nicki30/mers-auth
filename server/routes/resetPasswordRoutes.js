// // resetPasswordRoutes.js

// const express = require('express');
// const router = express.Router();
// const UserModel = require('../models/user'); // Asegúrate de importar el modelo de usuario correspondiente

// // Ruta para restablecer la contraseña
// router.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     try {
//         const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'El enlace de restablecimiento de contraseña no es válido o ha expirado.' });
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ success: true, message: 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.' });

//     } catch (error) {
//         console.error('Error al restablecer la contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al intentar restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.' });
//     }
// });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const UserModel = require('../models/user'); // Asegúrate de importar el modelo de usuario correspondiente

// // Ruta para restablecer la contraseña
// router.post('/reset-password', async (req, res) => {
//     const { token, password } = req.body; // Aquí se obtiene 'token' y 'password' del cuerpo de la solicitud

//     try {
//         const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'El enlace de restablecimiento de contraseña no es válido o ha expirado.' });
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ success: true, message: 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.' });

//     } catch (error) {
//         console.error('Error al restablecer la contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al intentar restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.' });
//     }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // Asegúrate de importar el modelo de usuario correspondiente

// // Ruta para restablecer la contraseña
// router.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     try {
//         const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'El enlace de restablecimiento de contraseña no es válido o ha expirado.' });
//         }

//         // Hashear la nueva contraseña
//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ success: true, message: 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.' });

//     } catch (error) {
//         console.error('Error al restablecer la contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al intentar restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.' });
//     }
// });

// module.exports = router;


// routes/resetPasswordRoutes.js
const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

// Ruta para restablecer contraseña con token
router.post('/reset-password/:token', resetPasswordController.resetPassword);

module.exports = router;
