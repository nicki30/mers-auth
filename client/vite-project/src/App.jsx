import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; // Importa ResetPassword
import GuestLogin from './pages/GuestLogin'; // Importa GuestLogin
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
                <Route path='/forgot-password' element={<ForgotPassword />} /> {/* Ruta para ForgotPassword */}
                <Route path='/reset-password' element={<ResetPassword />} /> {/* Ruta para ResetPassword */}
                <Route path='/guest-login' element={<GuestLogin />} /> {/* Ruta para GuestLogin */}
            </Routes>
        </>
    );
}

export default App;


