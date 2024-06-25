// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/login', formData);
//             const { data } = response;

//             if (data.error === 'El correo electrónico no está registrado') {
//                 toast.error('El correo electrónico no está registrado');
//             } else if (data.message === 'Inicio de sesión exitoso') {
//                 toast.success('Inicio de sesión exitoso. Bienvenido a Mental Oasis');
//                 setFormData({ email: '', password: '' });
//                 navigate('/');
//             } else {
//                 // Si el mensaje no es de éxito, manejar como error desconocido
//                 toast.error('Error desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
//             }
//         } catch (error) {
//             // Manejo específico de errores HTTP
//             if (error.response && error.response.status === 401 && error.response.data.error === 'La contraseña es incorrecta') {
//                 toast.error('La contraseña es incorrecta');
//             } else {
//                 console.error('Error al iniciar sesión:', error);
//                 toast.error('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
//             }
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div>
//             <h2>Iniciar Sesión</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="password">Contraseña:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit">Iniciar Sesión</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

// Login.jsx

// Login.jsx

// import React from 'react';
// import AuthCard from '../components/AuthCard';

// const Login = () => {
//   return (
//     <div>
//       <AuthCard isRegister={false} />
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import '../components/Login.css'; // Archivo de estilos CSS para Login
// import perro from '../components/perro.png';

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/login', formData);
//             const { data } = response;

//             if (data.error === 'El correo electrónico no está registrado') {
//                 toast.error('El correo electrónico no está registrado');
//             } else if (data.message === 'Inicio de sesión exitoso') {
//                 toast.success('Inicio de sesión exitoso. Bienvenido a Mental Oasis');
//                 setFormData({ email: '', password: '' });
//                 navigate('/');
//             } else {
//                 toast.error('Error desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 401 && error.response.data.error === 'La contraseña es incorrecta') {
//                 toast.error('La contraseña es incorrecta');
//             } else {
//                 console.error('Error al iniciar sesión:', error);
//                 toast.error('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
//             }
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="login-container">
//             <div className="login-content">
//                 <div className="login-form-container">
//                     <h2>Iniciar Sesión</h2>
//                     <form onSubmit={handleSubmit} className="login-form">
//                         <div className="form-group">
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="password">Contraseña:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="btn-login">Iniciar Sesión</button>
//                     </form>
//                 </div>
//                 <div className="login-message">
//                     <h3>Bienvenido a Mental Oasis</h3>
                    
//                     <p>Accede al juego de MentalOasis y descubre un mundo divertido</p>
//                     <img src={perro} alt="Mental Oasis Logo" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../components/Login.css'; // Archivo de estilos CSS para Login
import perro from '../components/perro.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            const { data } = response;
            console.log(data)

            if (data.error === 'El correo electrónico no está registrado') {
                toast.error('El correo electrónico no está registrado');
            } else if (data.token) {

                console.log('Token recibido:', data.token); // Verifica el token recibido
                localStorage.setItem('token', data.token);
                console.log(localStorage.getItem('token'));

                toast.success('Inicio de sesión exitoso. Bienvenido a Mental Oasis');
                setFormData({ email: '', password: '' });
                navigate('/');

            // } else if (data.message === 'Inicio de sesión exitoso') {
            } else {
                toast.error('Error desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401 && error.response.data.error === 'La contraseña es incorrecta') {
                toast.error('La contraseña es incorrecta');
            } else {
                console.error('Error al iniciar sesión:', error);
                toast.error('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-container">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
                        </div>

                        <button type="submit" className="btn-login">Iniciar Sesión</button>
                    </form>
                </div>
                <div className="login-message">
                    <h3>Bienvenido a Mental Oasis</h3>
                    <p>Accede a tu cuenta para explorar nuestros servicios exclusivos.</p>
                    <img src={perro} alt="Mental Oasis Logo" />
                </div>
            </div>
        </div>
    );
};

export default Login;

