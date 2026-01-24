import React from 'react';
import './Admin.css';

function Admin() {
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

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administracion</h1>
        <p>Gestion de vehiculos FranRental</p>
      </div>

      <div className="admin-menu">
        <div className="menu-card" onClick={() => handleNavigate('/admin/add')}>
          <div className="menu-icon">+</div>
          <h3>Agregar Vehiculo</h3>
          <p>Registrar un nuevo vehiculo en el sistema</p>
        </div>

        <div className="menu-card" onClick={() => handleNavigate('/admin/list')}>
          <div className="menu-icon">📋</div>
          <h3>Lista de Vehiculos</h3>
          <p>Ver y gestionar todos los vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => handleNavigate('/admin/categories')}>
          <div className="menu-icon">🏷️</div>
          <h3>Categorias</h3>
          <p>Administrar categorias de vehiculos</p>
        </div>

        <div className="menu-card" onClick={() => handleNavigate('/admin/features')}>
          <div className="menu-icon">⭐</div>
          <h3>Caracteristicas</h3>
          <p>Administrar caracteristicas de vehiculos</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;