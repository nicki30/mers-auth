import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GuestLogin from './pages/GuestLogin';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <>
            <Navbar />
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} /> {/* Ruta para olvido de contraseña */}
                <Route path='/reset/:token' element={<ResetPassword />} /> {/* Ruta para restablecimiento de contraseña */}
                <Route path='/guest-login' element={<GuestLogin />} /> {/* Ruta para inicio de sesión de invitados */}
            </Routes>
        </>
    );
}

export default App;
