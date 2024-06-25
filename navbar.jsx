
import React from 'react';
import mentaloasislogo from '/pic/mentaloasislogo.png';
import './Navbar.css'
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="navbar navbar-color navbar-expand-lg navbar-light bg-light" style={{ padding: "15px" }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand" href="#">
          <img loading="lazy" src={mentaloasislogo} width="45" height="" className="d-inline-block align-top me-3" alt="Logo" />
          <span style={{ fontSize: "1em", fontStyle: "italic", color: 'black', fontWeight: 'bold' }} className="fw-semibold centered-text me-3">MENTAL OASIS</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active fw-semibold centered-text" aria-current="page" to="/" style={{ color: 'black', fontWeight: 'bold', paddingRight: '25px' }}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text" to="/juego" style={{ color: 'black', fontWeight: 'bold', paddingRight: '25px' }}>Juego SaludMental</Link>
            </li>
            
          <li className="nav-item dropdown d-flex flex">
            <Link className="nav-link fw-semibold centered-text " to="/aprendamos" style={{ color: 'black', fontWeight: 'bold', paddingRight: '0px' }}>Aprendamos</Link>
              <Link className="nav-link fw-semibold centered-text dropdown-toggle" to="/aprendamos" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black', fontWeight: 'bold', paddingRight: '25px' }}></Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/como-me-siento">Como Me Siento</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/higiene-del-sueño">Higiene Del Sueño</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/salud-fisica"> Salud fisica</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/tabla-nutricion"> Tabla De Nutrición </Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/tipos-de-inteligencia"> Tipos De Inteligencia </Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text" to="/consejos" style={{ color: 'black', fontWeight: 'bold', paddingRight: '25px' }}>Consejos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text" to="/sobre-nosotras" style={{ color: 'black', fontWeight: 'bold' }}>Sobre Nosotras</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
          
          <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary rounded-pill btn-registrarse" style={{ width: "100px", fontSize: "15px" }} to="/registrarse"><span className="centered-text">Registrarse</span></Link>
            </li>  
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success rounded-pill me-2 btn-iniciarsesion" style={{ width: "120px", fontSize: "15px" }} to="/iniciar-sesion"><span className="centered-text">Iniciar Sesión</span></Link>
            </li>    
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success rounded-pill me-2 btn-invitado" style={{ width: "100px", fontSize: "15px" }} to="/invitado"><span className="centered-text">Invitado</span></Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
