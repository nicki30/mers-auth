import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../components/Login.css'; // Reutilizamos estilos CSS de Login
import osito from '../components/osito.jpeg'; // Importamos la imagen (debe ajustarse según la ubicación real)

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Obtener el token de reset desde la URL
    console.log(token);
    console.log(`Recibida solicitud POST en /api/auth/reset-password/${token}`);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            // const response = await axios.post('/api/reset-password/${token}', { password, token });
            const response = await axios.post(`/api/auth/reset-password/${token}`, { password, token }); // Ruta ajustada según tu configuración
            const { data } = response;

            if (data.success) {
                toast.success('Contraseña restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.');
                navigate('/login');
            } else {
                toast.error('Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            toast.error('Error al intentar restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-container">
                    <h2>Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="password">Nueva Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login">Restablecer Contraseña</button>
                    </form>
                </div>
                <div className="login-message">
                    <h3>Restablecer Contraseña</h3>
                    <p>Ingresa tu nueva contraseña para restablecerla y pasa nada a todxs se nos olvida</p>
                    <img src={osito} alt="Mental Oasis Logo" />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
