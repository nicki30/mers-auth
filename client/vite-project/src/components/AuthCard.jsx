// AuthCard.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const AuthCard = ({ isRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRegister) {
      setFormData({ ...formData, [name]: value });
      setRegisterErrors({ ...registerErrors, [name]: '' });
    } else {
      setLoginData({ ...loginData, [name]: value });
      setLoginError('');
    }
  };

  const validateForm = () => {
    if (isRegister) {
      return validateRegisterForm();
    } else {
      return validateLoginForm();
    }
  };

  const validateRegisterForm = () => {
    let valid = true;
    const { name, email, password } = formData;
    const errorsCopy = { ...registerErrors };

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

    setRegisterErrors(errorsCopy);
    return valid;
  };

  const validateLoginForm = () => {
    const { email, password } = loginData;

    if (!email || !password) {
      setLoginError('Todos los campos son requeridos');
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isRegister) {
      try {
        const response = await axios.post('/register', formData);

        if (response.data.error) {
          handleRegistrationError(response.data.error);
        } else {
          setFormData({ name: '', email: '', password: '' });
          toast.success('Registro completado con éxito, ¡Bienvenido a Mental Oasis!');
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        toast.error('Error al intentar registrar. Por favor, inténtalo de nuevo más tarde.');
      }
    } else {
      try {
        const response = await axios.post('/login', loginData);
        const { data } = response;

        if (data.error === 'El correo electrónico no está registrado') {
          setLoginError('El correo electrónico no está registrado');
        } else if (data.message === 'Inicio de sesión exitoso') {
          toast.success('Inicio de sesión exitoso. Bienvenido a Mental Oasis');
          navigate('/');
        } else {
          toast.error('Error desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
      } catch (error) {
        if (error.response && error.response.status === 401 && error.response.data.error === 'La contraseña es incorrecta') {
          setLoginError('La contraseña es incorrecta');
        } else {
          console.error('Error al iniciar sesión:', error);
          toast.error('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
      }
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
    <FormContainer>
      <Title>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</Title>
      <form onSubmit={handleFormSubmit}>
        {isRegister && (
          <>
            <input
              type='text'
              name='name'
              placeholder='Nombre'
              value={formData.name}
              onChange={handleInputChange}
            />
            {registerErrors.name && <ErrorMessage>{registerErrors.name}</ErrorMessage>}
          </>
        )}

        <input
          type='email'
          name='email'
          placeholder='Correo Electrónico'
          value={isRegister ? formData.email : loginData.email}
          onChange={handleInputChange}
        />
        {isRegister && registerErrors.email && <ErrorMessage>{registerErrors.email}</ErrorMessage>}

        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          value={isRegister ? formData.password : loginData.password}
          onChange={handleInputChange}
        />
        {isRegister && registerErrors.password && <ErrorMessage>{registerErrors.password}</ErrorMessage>}
        {!isRegister && loginError && <ErrorMessage>{loginError}</ErrorMessage>}

        <button type='submit'>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes una cuenta? Regístrate'}
      </button>
    </FormContainer>
  );
};

export default AuthCard;
