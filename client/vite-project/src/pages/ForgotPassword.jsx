import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../components/Login.css'; // Reutilizamos estilos CSS de Login
import unicornio from '../components/unicornio.png'; // Importamos la imagen (debe ajustarse según la ubicación real)

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar la solicitud POST al servidor
            const response = await axios.post('/api/auth/forgot-password', { email });// Ajusta la ruta según tu configuración
            const { data } = response;

            if (data.success) {
                toast.success('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña');
                navigate('/login');
            } else {
                toast.error('El correo electrónico proporcionado no está registrado');
            }
        } catch (error) {
            console.error('Error al enviar solicitud de restablecimiento de contraseña:', error);
            toast.error('Error al intentar enviar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-container">
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login">Enviar solicitud</button>
                    </form>
                </div>
                <div className="login-message">
                    <h3>Recupera tu contraseña</h3>
                    <p>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
                    <img src={unicornio} alt="Mental Oasis Logo" />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import '../components/Login.css'; // Reutilizamos estilos CSS de Login
// import unicornio from '../components/unicornio.png'; // Importamos la imagen (debe ajustarse según la ubicación real)

// const ForgotPassword = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/forgotPassword', { email });
//             const { data } = response;

//             if (data.success) {
//                 toast.success('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña');
//                 navigate('/login');
//             } else {
//                 toast.error('El correo electrónico proporcionado no está registrado');
//             }
//         } catch (error) {
//             console.error('Error al enviar solicitud de restablecimiento de contraseña:', error);
//             toast.error('Error al intentar enviar la solicitud. Por favor, inténtalo de nuevo más tarde.');
//         }
//     };

//     const handleChange = (e) => {
//         setEmail(e.target.value);
//     };

//     return (
//         <div className="login-container">
//             <div className="login-content">
//                 <div className="login-form-container">
//                     <h2>¿Olvidaste tu contraseña?</h2>
//                     <form onSubmit={handleSubmit} className="login-form">
//                         <div className="form-group">
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="btn-login">Enviar solicitud</button>
//                     </form>
//                 </div>
//                 <div className="login-message">
//                     <h3>Recupera tu contraseña</h3>
//                     <p>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
//                     <img src={unicornio} alt="Mental Oasis Logo" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
