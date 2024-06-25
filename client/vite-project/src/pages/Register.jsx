// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const navigate = useNavigate();

//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const [errors, setErrors] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const handleInputChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//         // Limpiar el mensaje de error cuando el usuario comienza a escribir de nuevo
//         setErrors({ ...errors, [e.target.name]: '' });
//     };

//     const validateForm = () => {
//         let valid = true;
//         const { name, email, password } = data;
//         const errorsCopy = { ...errors };

//         if (!name) {
//             errorsCopy.name = 'El nombre es requerido';
//             valid = false;
//         } else {
//             errorsCopy.name = '';
//         }

//         if (!email) {
//             errorsCopy.email = 'El correo electrónico es requerido';
//             valid = false;
//         } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es|org)$/i.test(email)) {
//             errorsCopy.email = 'El correo electrónico debe ser de Gmail, Outlook o Hotmail';
//             valid = false;
//         } else {
//             errorsCopy.email = '';
//         }

//         if (!password) {
//             errorsCopy.password = 'La contraseña es requerida';
//             valid = false;
//         } else if (password.length < 8) {
//             errorsCopy.password = 'La contraseña debe tener al menos 8 caracteres';
//             valid = false;
//         } else if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:<,.>?])(?=.*[a-z]).{8,}/.test(password)) {
//             errorsCopy.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
//             valid = false;
//         } else {
//             errorsCopy.password = '';
//         }

//         setErrors(errorsCopy);
//         return valid;
//     };

//     const registerUser = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const response = await axios.post('/register', data);

//             if (response.data.error) {
//                 handleRegistrationError(response.data.error); // Función para manejar errores específicos
//             } else {
//                 setData({ name: '', email: '', password: '' });
//                 toast.success('Registro completado con éxito, ¡Bienvenido a Mental Oasis!');
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error('Error al registrar:', error);
//             toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
//         }
//     };

//     const handleRegistrationError = (error) => {
//         if (error.includes('email')) {
//             toast.error('El correo electrónico ya ha sido registrado');
//         } else if (error.includes('password')) {
//             toast.error('La contraseña no cumple con los requisitos mínimos');
//         } else {
//             toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={registerUser}>
//                 <label>Name</label>
//                 <input
//                     type='text'
//                     name='name'
//                     placeholder='Enter name ...'
//                     value={data.name}
//                     onChange={handleInputChange}
//                 />
//                 {errors.name && <p className="error-message">{errors.name}</p>}

//                 <label>Email</label>
//                 <input
//                     type='email'
//                     name='email'
//                     placeholder='Enter email ...'
//                     value={data.email}
//                     onChange={handleInputChange}
//                 />
//                 {errors.email && <p className="error-message">{errors.email}</p>}

//                 <label>Password</label>
//                 <input
//                     type='password'
//                     name='password'
//                     placeholder='Enter password ...'
//                     value={data.password}
//                     onChange={handleInputChange}
//                 />
//                 {errors.password && <p className="error-message">{errors.password}</p>}

//                 <button type='submit'>Submit</button>
//             </form>
//         </div>
//     );
// };

// // export default Register;

// // Register.jsx

// // Register.jsx

// import React from 'react';
// import AuthCard from '../components/AuthCard';

// const Register = () => {
//   return (
//     <div>
//       <AuthCard isRegister={true} />
//     </div>
//   );
// };

// export default Register;

// // Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import '../components/Register.css'; // Archivo de estilos CSS para Register
// import winner from '../components/winner.png';

// const Register = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const [errors, setErrors] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const handleInputChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//         // Limpiar el mensaje de error cuando el usuario comienza a escribir de nuevo
//         setErrors({ ...errors, [e.target.name]: '' });
//     };

//     const validateForm = () => {
//         let valid = true;
//         const { name, email, password } = data;
//         const errorsCopy = { ...errors };

//         if (!name) {
//             errorsCopy.name = 'El nombre es requerido';
//             valid = false;
//         } else {
//             errorsCopy.name = '';
//         }

//         if (!email) {
//             errorsCopy.email = 'El correo electrónico es requerido';
//             valid = false;
//         } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es|org)$/i.test(email)) {
//             errorsCopy.email = 'El correo electrónico debe ser de Gmail, Outlook o Hotmail';
//             valid = false;
//         } else {
//             errorsCopy.email = '';
//         }

//         if (!password) {
//             errorsCopy.password = 'La contraseña es requerida';
//             valid = false;
//         } else if (password.length < 8) {
//             errorsCopy.password = 'La contraseña debe tener al menos 8 caracteres';
//             valid = false;
//         } else if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:<,.>?])(?=.*[a-z]).{8,}/.test(password)) {
//             errorsCopy.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
//             valid = false;
//         } else {
//             errorsCopy.password = '';
//         }

//         setErrors(errorsCopy);
//         return valid;
//     };

//     const registerUser = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const response = await axios.post('/register', data);

//             if (response.data.error) {
//                 handleRegistrationError(response.data.error); // Función para manejar errores específicos
//             } else {
//                 setData({ name: '', email: '', password: '' });
//                 toast.success('Registro completado con éxito, ¡Bienvenido a Mental Oasis!');
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error('Error al registrar:', error);
//             toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
//         }
//     };

//     const handleRegistrationError = (error) => {
//         if (error.includes('email')) {
//             toast.error('El correo electrónico ya ha sido registrado');
//         } else if (error.includes('password')) {
//             toast.error('La contraseña no cumple con los requisitos mínimos');
//         } else {
//             toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
//         }
//     };

//     return (
//         <div className="register-container">
//             <div className="register-content">
//                 <div className="register-form-container">
//                     <h2>Registrarse</h2>
//                     <form onSubmit={registerUser} className="register-form">
//                         <div className="form-group">
//                             <label htmlFor="name">Nombre:</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={data.name}
//                                 onChange={handleInputChange}
//                                 placeholder="Ingrese su nombre ..."
//                                 required
//                             />
//                             {errors.name && <p className="error-message">{errors.name}</p>}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={handleInputChange}
//                                 placeholder="Ingrese su correo electrónico ..."
//                                 required
//                             />
//                             {errors.email && <p className="error-message">{errors.email}</p>}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="password">Contraseña:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={data.password}
//                                 onChange={handleInputChange}
//                                 placeholder="Ingrese su contraseña ..."
//                                 required
//                             />
//                             {errors.password && <p className="error-message">{errors.password}</p>}
//                         </div>

//                         <button type="submit" className="btn-register">Registrarse</button>
//                     </form>
//                 </div>
//                 <div className="register-message">
//                     <h3>Bienvenido a Mental Oasis</h3>
//                     <p>Regístrate para poder ingresar y jugar Mental Oasis</p>
//                     <img src={winner} alt="Mental Oasis Logo" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../components/Register.css'; // Archivo de estilos CSS para Register
import winner from '../components/winner.png';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // Limpiar el mensaje de error cuando el usuario comienza a escribir de nuevo
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let valid = true;
        const { name, email, password } = data;
        const errorsCopy = { ...errors };

        if (!name) {
            errorsCopy.name = 'El nombre es requerido';
            valid = false;
        } else {
            errorsCopy.name = '';
        }

        if (!email) {
            errorsCopy.email = 'El correo electrónico es requerido';
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es|org)$/i.test(email)) {
            errorsCopy.email = 'El correo electrónico debe ser de Gmail, Outlook o Hotmail';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        if (!password) {
            errorsCopy.password = 'La contraseña es requerida';
            valid = false;
        } else if (password.length < 8) {
            errorsCopy.password = 'La contraseña debe tener al menos 8 caracteres';
            valid = false;
        } else if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:<,.>?])(?=.*[a-z]).{8,}/.test(password)) {
            errorsCopy.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
            valid = false;
        } else {
            errorsCopy.password = '';
        }

        setErrors(errorsCopy);
        return valid;
    };

    const registerUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('/register', data);

            if (response.data.error) {
                handleRegistrationError(response.data.error); // Función para manejar errores específicos
            } else {
                // Almacenar el token en localStorage después de un registro exitoso
                localStorage.setItem('token', response.data.token);
                setData({ name: '', email: '', password: '' });
                toast.success('Registro completado con éxito, ¡Bienvenido a Mental Oasis!');
                navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleRegistrationError = (error) => {
        if (error.includes('email')) {
            toast.error('El correo electrónico ya ha sido registrado');
        } else if (error.includes('password')) {
            toast.error('La contraseña no cumple con los requisitos mínimos');
        } else {
            toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-form-container">
                    <h2>Registrarse</h2>
                    <form onSubmit={registerUser} className="register-form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                placeholder="Ingrese su nombre ..."
                                required
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                placeholder="Ingrese su correo electrónico ..."
                                required
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleInputChange}
                                placeholder="Ingrese su contraseña ..."
                                required
                            />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>

                        <button type="submit" className="btn-register">Registrarse</button>
                    </form>
                </div>
                <div className="register-message">
                    <h3>Bienvenido a Mental Oasis</h3>
                    <p>Regístrate para poder ingresar y jugar Mental Oasis</p>
                    <img src={winner} alt="Mental Oasis Logo" />
                </div>
            </div>
        </div>
    );
};

export default Register;
