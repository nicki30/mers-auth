import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../components/GuestLogin.css'; // Archivo de estilos CSS para GuestLogin
import mujer from '../components/mujer.png'; // Importar la imagen

const GuestLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        favoriteTopic: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí puedes agregar la lógica para enviar los datos del invitado al servidor si es necesario
            // Por ejemplo, enviarlos como parte de un formulario o realizar una acción específica
            // dependiendo de los requisitos de tu aplicación.

            // Ejemplo de solicitud ficticia:
            // const response = await axios.post('/guest-login', formData);

            // Simplemente mostrar un mensaje en este caso:
            toast.success('Ingreso como invitado exitoso. ¡Bienvenido a Mental Oasis!');
            navigate('/'); // Redireccionar a la página principal u otra ubicación según sea necesario
        } catch (error) {
            console.error('Error al ingresar como invitado:', error);
            toast.error('Error al intentar ingresar como invitado. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="guest-login-container">
            <div className="guest-login-content">
                <div className="guest-login-form-container">
                    <h2>Ingresar como Invitado</h2>
                    <form onSubmit={handleSubmit} className="guest-login-form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Ingrese su nombre ..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Edad:</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Ingrese su edad ..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="favoriteTopic">Elegir tu tema preferido:</label>
                            <select
                                id="favoriteTopic"
                                name="favoriteTopic"
                                value={formData.favoriteTopic}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecciona un tema...</option>
                                <option value="Salud Mental">Salud Mental</option>
                                <option value="Hábitos alimenticios">Hábitos alimenticios</option>
                                <option value="Higiene del sueño">Higiene del sueño</option>
                                <option value="Estados del ánimo">Estados del ánimo</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-guest-login">Ingresar como Invitado</button>
                    </form>
                </div>
                <div className="guest-login-message">
                    <h3>Bienvenido a Mental Oasis</h3>
                    <p>Explora nuestros servicios exclusivos como invitado.</p>
                    <img src={mujer} alt="Mental Oasis Logo" />
                </div>
            </div>
        </div>
    );
};

export default GuestLogin;
