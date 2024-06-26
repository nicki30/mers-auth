import React from 'react';
import './NavBarTransparente.css';
import mentaloasislogo from '/pic/mentaloasislogo.png';
import { Link } from 'react-router-dom';

const NavBarTransparente2 = () => {
  return (
    <nav id="NavBarTransparente" className="navbar navbar-expand-lg navbar-light navbar-transparent mt-2" style={{ padding: "15px" }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/admin/dashboard">
          <img loading="lazy" src={mentaloasislogo} width="45" height="" className="d-inline-block align-top me-3" alt="Logo" />
          <span style={{ fontSize: "1 em", fontStyle: "normal", color: 'white', fontWeight: 'bold' }} className="fw-semibold centered-text me-3">MENTAL OASIS</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active fw-semibold centered-text" aria-current="page"  to="/"  style={{ color: 'white', fontWeight: 'bold', paddingRight: '25px' }}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text"  to="/juego"  style={{ color: 'white', fontWeight: 'bold', paddingRight: '25px' }}>Juego Salud Mental</Link>
            </li>
            <li className="nav-item dropdown d-flex flex">
            <Link className="nav-link fw-semibold centered-text " to="/aprendamos" style={{ color: 'white', fontWeight: 'bold', paddingRight: '0px' }}>Aprendamos</Link>
              <Link className="nav-link fw-semibold centered-text dropdown-toggle" to="/aprendamos" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white', fontWeight: 'bold', paddingRight: '25px' }}></Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/como-me-siento">Como Me Siento</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/higiene-del-sueño">Higiene Del Sueño</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/salud-fisica"> Salud fisica</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/tabla-nutricion"> Tabla De Nutrición </Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/aprendamos/tipos-de-inteligencia"> Tipos De Inteligencia </Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text"  to="/consejos"  style={{ color: 'white', fontWeight: 'bold', paddingRight: '25px' }}>Consejos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold centered-text"  to="/sobre-nosotras"  style={{ color: 'white', fontWeight: 'bold' }}>Sobre Nosotras</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success rounded-pill me-2 btn-iniciarsesion" style={{ width: "120px", fontSize: "15px" }} to="/iniciar-sesion"><span className="centered-text">Cerrar Sesión</span></Link>
            </li>    
          </ul>
        </div>
      </div>
    </nav>
  );
}
  export default NavBarTransparente2;
