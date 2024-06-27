// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');
// const User = require('../models/user'); // Reemplaza con el modelo de usuario correspondiente

// // Ruta para manejar la solicitud de restablecimiento de contraseña
// router.post('/forgotPassword', async (req, res) => {
//     const { email } = req.body;

//     try {
//         // Buscar al usuario por su correo electrónico
//         const user = await User.findOne({ email });

//         if (!user) {
//             // Si el usuario no existe, enviar un mensaje de error
//             return res.status(404).json({ success: false, message: 'El correo electrónico proporcionado no está registrado.' });
//         }

//         // Generar un token único para restablecimiento de contraseña (opcional)
//         const resetToken = user.generatePasswordResetToken();

//         // Guardar el token en la base de datos o en la instancia del usuario (depende de tu implementación)

//         // Configurar el transportador de correo (nodemailer)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER, // Correo electrónico del remitente
//                 pass: process.env.EMAIL_PASSWORD // Contraseña del correo electrónico del remitente
//             }
//         });

//         // Configurar el correo electrónico
//         const mailOptions = {
//             from: process.env.EMAIL_USER, // Correo electrónico del remitente
//             to: email, // Correo electrónico del destinatario (el usuario)
//             subject: 'Restablecer Contraseña - Mental Oasis',
//             text: `Hola ${user.name},\n\n
//                     Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n
//                     ${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n
//                     Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.\n\n
//                     Saludos,\n
//                     Equipo de Soporte - Mental Oasis`
//         };

//         // Enviar el correo electrónico
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error al enviar el correo electrónico:', error);
//                 return res.status(500).json({ success: false, message: 'Error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.' });
//             }
//             console.log('Correo electrónico enviado:', info.response);
//             res.json({ success: true, message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.' });
//         });

//     } catch (error) {
//         console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.' });
//     }
// });

// module.exports = router;

// routes/forgotPasswordRoutes.js
const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPasswordController.forgotPassword);

module.exports = router;
