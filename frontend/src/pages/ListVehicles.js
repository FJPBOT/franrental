import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService';
import './ListVehicles.css';

function ListVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAll();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los vehículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (vehicle) => {
    setDeleteConfirm(vehicle);
  };

  const handleDeleteConfirm = async () => {
    try {
      await vehicleService.delete(deleteConfirm.id);
      setVehicles(vehicles.filter(v => v.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (err) {
      alert('Error al eliminar el vehículo');
      console.error(err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleBack = () => {
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="list-container">
        <div className="loading">Cargando vehículos...</div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Lista de Vehículos</h1>
        <button onClick={handleBack} className="btn-back">← Volver</button>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {vehicles.length === 0 ? (
        <div className="no-vehicles">
          <p>No hay vehículos registrados</p>
          <button onClick={() => window.location.href = '/admin/add'} className="btn-primary">
            Agregar Primer Vehículo
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.name}</td>
                  <td>
                    <span className="category-badge">{vehicle.category}</span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDeleteClick(vehicle)} 
                      className="btn-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el vehículo:</p>
            <p className="vehicle-name-confirm">{deleteConfirm.name}</p>
            <div className="modal-actions">
              <button onClick={handleDeleteCancel} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirm} className="btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListVehicles;