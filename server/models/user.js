const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})
//aquí la colección de usuarios, dentro de la coleccion colocamos el esquema de usuario
const UserModel = mongoose.model('User', userSchema);

//después recordar exportar siempre

module.exports = UserModel; 