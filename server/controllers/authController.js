const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const generarToken = (user) =>{
    const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        score: user.score
    };
    const secret = process.env.JWT_SECRET; // Obtener la clave secreta desde una variable de entorno
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Función de prueba
const test = (req, res) => {
    res.json('Está funcionando');
};

// Registro de usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar que se haya proporcionado el nombre
        if (!name) {
            return res.status(400).json({
                error: 'El nombre es requerido'
            });
        }

        // Verificar la longitud y presencia de la contraseña
        if (!password || password.length < 8) {
            return res.status(400).json({
                error: "La contraseña es requerida y debe ser de al menos 8 caracteres de largo"
            });
        }

        // Verificar el correo en nuestra base de datos
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'El email ya ha sido ocupado para otra cuenta'
            });
        }

        const hashedPassword = await hashPassword(password);

        // Agregar un usuario a nuestra base de datos
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generarToken(newUser);
        
        // Devolver el usuario creado en la respuesta
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: newUser,
            token: token
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

// Inicio de sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar si el usuario existe en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: 'El correo electrónico no está registrado'
            });
        }

        // Verificar si la contraseña proporcionada coincide con la almacena
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                error: 'La contraseña es incorrecta'
            });
        }

         // Generar token JWT después de iniciar sesión también se usa
        const token = generarToken(user);

        // Si las credenciales son correctas, enviar una respuesta exitosa
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                score: user.score
                // Puedes incluir otros datos del usuario si los necesitas
            },
            token: token
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser
};



//const match = await comparePassword(password, user.password)
//if (match) {
//res.json('password match')
//}
//}catch (error) {
//console.log(error)
//}
//}