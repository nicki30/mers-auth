// // controllers/forgotPasswordController.js
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const User = require('../models/user');
// const { hashPassword } = require('../helpers/auth');

// // Generar un token único para restablecimiento de contraseña
// const generatePasswordResetToken = (user) => {
//     return jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
// };

// Enviar correo electrónico con instrucciones para restablecer contraseña
// const sendPasswordResetEmail = (email, resetToken) => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         // service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_ACCOUNT,
//             pass: process.env.PASS_EMAIL_ACCOUNT
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Restablecer Contraseña - Mental Oasis',
//         text: `Hola,\n\n
//                 Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n
//                 ${process.env.CLIENT_URL}/reset/${resetToken}\n\n
//                 Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.\n\n
//                 Saludos,\n
//                 Equipo de Soporte - Mental Oasis`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error al enviar el correo electrónico:', error);
//         } else {
//             console.log('Correo electrónico enviado:', info.response);
//         }
//     });
// };

// // Controlador para manejar la solicitud de recuperación de contraseña
// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'El correo electrónico proporcionado no está registrado.' });
//         }

//         // Generar un token único para restablecimiento de contraseña
//         const resetToken = generatePasswordResetToken(user);

//         // Guardar el token en el usuario
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 900000; // 15 minutos en milisegundos
//         await user.save();

//         // Enviar correo electrónico con el token generado
//         sendPasswordResetEmail(email, resetToken);

//         res.json({ 
//             success: true, 
//             message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
//             resetToken: resetToken
//          });

//     } catch (error) {
//         console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.' });
//     }
// };

// Importa el modelo de usuario y otras dependencias necesarias
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const { hashPassword } = require('../helpers/auth');

// // Genera un token único para restablecimiento de contraseña
// const generatePasswordResetToken = (user) => {
//     return jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
// };

// // Envía el correo electrónico con las instrucciones para restablecer la contraseña
// const sendPasswordResetEmail = (email, resetToken) => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.EMAIL_ACCOUNT,
//             pass: process.env.PASS_EMAIL_ACCOUNT
//         }
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Restablecer Contraseña - Mental Oasis',
//         text: `Hola,\n\nHemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${process.env.CLIENT_URL}/reset/${resetToken}\n\nSi no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.\n\nSaludos,\nEquipo de Soporte - Mental Oasis`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error al enviar el correo electrónico:', error);
//         } else {
//             console.log('Correo electrónico enviado:', info.response);
//         }
//     });
// };

// // Controlador para manejar la solicitud de recuperación de contraseña
// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'El correo electrónico proporcionado no está registrado.' });
//         }

//         // Genera un token único para restablecimiento de contraseña
//         const resetToken = generatePasswordResetToken(user);

//         // Guarda el token en el usuario
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 900000; // 15 minutos en milisegundos
//         await user.save();

//         // Envia el correo electrónico con el token generado
//         sendPasswordResetEmail(email, resetToken);

//         res.json({ 
//             success: true, 
//             message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
//             resetToken: resetToken
//          });

//     } catch (error) {
//         console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.' });
//     }
// };


// controllers/forgotPasswordController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { hashPassword } = require('../helpers/auth');

// Genera un token único para restablecimiento de contraseña
const generatePasswordResetToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
};

// Envía el correo electrónico con las instrucciones para restablecer la contraseña
const sendPasswordResetEmail = (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.PASS_EMAIL_ACCOUNT
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecer Contraseña - Mental Oasis',
        text: `Hola,\n\nHemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${process.env.CLIENT_URL}/reset/${resetToken}\n\nSi no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.\n\nSaludos,\nEquipo de Soporte - Mental Oasis`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });
};

// Controlador para manejar la solicitud de recuperación de contraseña
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'El correo electrónico proporcionado no está registrado.' });
        }

        // Genera un token único para restablecimiento de contraseña
        const resetToken = generatePasswordResetToken(user);

        // Guarda el token en el usuario
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 900000; // 15 minutos en milisegundos
        await user.save();

        // Envia el correo electrónico con el token generado
        sendPasswordResetEmail(email, resetToken);

        res.json({ 
            success: true, 
            message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
            resetToken: resetToken
         });

    } catch (error) {
        console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
        res.status(500).json({ success: false, message: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.' });
    }
};
