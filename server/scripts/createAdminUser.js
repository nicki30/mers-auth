const mongoose = require('mongoose');
const UserModel = require('../models/user');

// Conectarse a la base de datos
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Añadido para evitar advertencia de deprecación
})
.then(() => {
    console.log('Conectado a la base de datos');
    
    // Define el usuario administrador inicial
    const adminUser = new UserModel({
        name: 'Administrador',
        email: 'admin@example.com',
        password: 'tu_contraseña_segura',
        isAdmin: true
    });

    // Guarda el usuario administrador en la base de datos
    adminUser.save()
        .then(() => {
            console.log('Usuario administrador creado exitosamente');
            mongoose.connection.close();
        })
        .catch(err => console.error(err));
})
.catch((err) => console.error('Error al conectar a la Base de datos', err));










// // // scripts/createAdminUser.js

// // const mongoose = require('mongoose');
// // const UserModel = require('../models/user');
// // const dotenv = require('dotenv');

// // // Cargar variables de entorno desde .env
// // dotenv.config();

// // // Verificar si se cargaron correctamente las variables de entorno
// // if (!process.env.MONGO_URL) {
// //     console.error('Error: No se encontró la variable MONGO_URL en el archivo .env');
// //     process.exit(1); // Salir del proceso con código de error
// // }

// // // Conectar a la base de datos MongoDB
// // mongoose.connect(process.env.MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
// // .then(() => {
// //     console.log('Conexión exitosa a MongoDB');

// //     // Define el usuario administrador inicial
// //     const adminUser = new UserModel({
// //         name: 'Administrador',
// //         email: 'admin@gmail.com',
// //         password: 'Prueba1',
// //         isAdmin: true
// //     });

// //     // Guarda el usuario administrador en la base de datos
// //     adminUser.save()
// //         .then(() => {
// //             console.log('Usuario administrador creado exitosamente');
// //             mongoose.connection.close();
// //         })
// //         .catch(err => {
// //             console.error('Error al guardar usuario administrador:', err);
// //             mongoose.connection.close();
// //         });
// // })
// // .catch(err => {
// //     console.error('Error al conectar a MongoDB:', err);
// // });

// const mongoose = require('mongoose');
// const UserModel = require('../models/user');

// // Define el usuario administrador inicial
// const adminUser = new UserModel({
//     name: 'Administrador',
//     email: 'admin@example.com',
//     password: 'tu_contraseña_segura',
//     isAdmin: true
// });

// // Guarda el usuario administrador en la base de datos
// adminUser.save()
//     .then(() => {
//         console.log('Usuario administrador creado exitosamente');
//         mongoose.connection.close();
//     })
//     .catch(err => console.error(err));
