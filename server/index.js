require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const guestRoutes = require ('./routes/guestRoutes.js');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes.js'); // Asegúrate de que la ruta sea correcta

const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
})
    .then(() => console.log('Base de datos conectada'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Habilitar CORS globalmente
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173' // Ajusta según tu configuración de frontend
}));

// Rutas
app.use('/', authRoutes); // Rutas para autenticación
app.use('/api/guests', guestRoutes); // Ruta para invitado
app.use('/api', forgotPasswordRoutes); // Rutas para restablecimiento de contraseña
app.use('/api', forgotPasswordRoutes); //Ruta para volver a tener contraseña nueva


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
