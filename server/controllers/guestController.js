const Guest = require('../models/guestModel');

// Controlador para manejar el registro de invitados
const registerGuest = async (req, res) => {
    try {
        const { name, age, favoriteTopic } = req.body;

        // Crear una nueva instancia del modelo Guest
        const newGuest = new Guest({
            name,
            age,
            favoriteTopic
        });

        // Guardar en la base de datos
        const savedGuest = await newGuest.save();

        res.status(201).json(savedGuest); // Devolver el objeto guardado como respuesta
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerGuest
};
