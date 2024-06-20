const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require ('mongoose')
const cookieParser = require('cookie-parser')
const app = express();


//conectarse a la BBDD

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Base de datos conectada'))
.catch((err) => console.log('Erro a conectar Base de datos', err))

//Usamos middleware

app.use(express.json());
//midd usados para el token
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.use('/', require('./routes/authRoutes'))



const port = 8000;


app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`))