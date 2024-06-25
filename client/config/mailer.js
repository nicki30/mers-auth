// utils/mailer.js

const nodemailer = require('nodemailer');

// Configuración del transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otros servicios como 'hotmail', 'yahoo', etc.
    auth: {
        user: 'tu_correo@gmail.com', // Tu correo desde donde enviarás los correos
        pass: 'tu_contraseña' // Contraseña de tu correo
    }
});

module.exports = transporter;
