



const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../server/models/user');
const { hashPassword, comparePassword } = require('../auth/auth');

// Generar un token único para restablecimiento de contraseña
const generatePasswordResetToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
};

// Enviar correo electrónico con instrucciones para restablecer contraseña
const sendPasswordResetEmail = (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecer Contraseña - Mental Oasis',
        text: `Hola,\n\n
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n
                ${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n
                Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.\n\n
                Saludos,\n
                Equipo de Soporte - Mental Oasis`
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

        // Generar un token único para restablecimiento de contraseña
        const resetToken = generatePasswordResetToken(user);

        // Guardar el token en el usuario
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 900000; // 15 minutos en milisegundos
        await user.save();

        // Enviar correo electrónico con el token generado
        sendPasswordResetEmail(email, resetToken);

        res.json({ success: true, message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.' });

    } catch (error) {
        console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
        res.status(500).json({ success: false, message: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.' });
    }
};

// Controlador para manejar el reseteo de contraseña
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verificar si el token es válido y no ha expirado
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await hashPassword(newPassword);

        // Actualizar la contraseña del usuario
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




// const nodemailer = require('nodemailer');
// const User = require('../models/user'); // Asegúrate de importar correctamente tu modelo de usuario
// const jwt = require ('jsonwebtoken');

// // Función para solicitar recuperar contraseña
// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'El correo electrónico proporcionado no está registrado.' });
//         }

//         // Generar un token único para restablecimiento de contraseña (podrías implementar esto en tu modelo de usuario)
//         const generatePasswordResetToken = () => {
//             const token = jwt.sign({ _id: this._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
//             return token;
//         };

//         // Guardar el token en la instancia del usuario (si es necesario)

//         // Configurar el transportador de correo (nodemailer)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });

//         // Configurar el correo electrónico
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
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
// };

// // Función para resetear contraseña
// exports.resetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     try {
//         if (!token) {
//             return res.status(400).json({ success: false, message: 'Token inválido o expirado.' });
//         }

//         // Aquí deberías implementar la lógica para verificar y actualizar la contraseña en la base de datos
//         // Puedes utilizar el token para identificar al usuario y actualizar su contraseña

//         res.json({ success: true, message: 'Contraseña actualizada correctamente.' });

//     } catch (error) {
//         console.error('Error al resetear contraseña:', error);
//         res.status(500).json({ success: false, message: 'Error al resetear contraseña. Por favor, inténtalo de nuevo más tarde.' });
//     }
// };
