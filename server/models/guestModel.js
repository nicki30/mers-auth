// guestModel.js
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteTopic: { type: String, required: true }
});

const Guest = mongoose.model('Guest', guestSchema, 'guests'); // 'guests' es el nombre de la nueva colección

module.exports = Guest;
