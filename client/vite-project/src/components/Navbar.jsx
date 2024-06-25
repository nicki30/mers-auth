import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/reset/${resetToken}'>Olvidaste tu Contraseña</Link>
            <Link to='/reset-password'>Resetear Contraseña</Link>
            <Link to='/guest-login'>Ingresar como Invitado</Link>
        </nav>
    );
};

export default Navbar;
