import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="admin-mobile-message">
        <h2>Panel de Administracion</h2>
        <p>El panel de administracion no esta disponible en dispositivos moviles.</p>
        <p>Por favor, accede desde una computadora de escritorio.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administracion</h1>
        <p>Gestion de vehiculos FranRental</p>
      </div>

      <div className="admin-menu">
        <div className="menu-card" onClick={() => navigate('/admin/add')}>
          <div className="menu-icon">+</div>
          <h3>Agregar Vehiculo</h3>
          <p>Registrar un nuevo vehiculo en el sistema</p>
        </div>

        <div className="menu-card" onClick={() => navigate('/admin/list')}>
          <div className="menu-icon">L</div>
          <h3>Lista de Vehiculos</h3>
          <p>Ver y gestionar todos los vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => navigate('/admin/categories')}>
          <div className="menu-icon">C</div>
          <h3>Categorias</h3>
          <p>Administrar categorias de vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => navigate('/admin/features')}>
          <div className="menu-icon">F</div>
          <h3>Caracteristicas</h3>
          <p>Administrar caracteristicas de vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => navigate('/admin/reservations')}>
          <div className="menu-icon">R</div>
          <h3>Reservas</h3>
          <p>Administrar reservas de vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => navigate('/admin/users')}>
          <div className="menu-icon">U</div>
          <h3>Usuarios</h3>
          <p>Administrar roles y permisos de usuarios</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;