import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import './ListVehicles.css';

function ListVehicles() {
  const navigate = useNavigate();
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
      setError('Error al cargar los vehiculos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
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
      alert('Error al eliminar el vehiculo');
      console.error(err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleBack = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="list-container">
        <div className="loading">Cargando vehiculos...</div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Lista de Vehiculos</h1>
        <button onClick={handleBack} className="btn-back">← Volver</button>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {vehicles.length === 0 ? (
        <div className="no-vehicles">
          <p>No hay vehiculos registrados</p>
          <button onClick={() => navigate('/admin/add')} className="btn-primary">
            Agregar Primer Vehiculo
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.name}</td>
                  <td>
                    {vehicle.categoryTitle ? (
                      <span className="category-badge">{vehicle.categoryTitle}</span>
                    ) : (
                      <span className="no-category">Sin categoria</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEdit(vehicle.id)} 
                        className="btn-edit"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(vehicle)} 
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </div>
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
            <h2>Confirmar Eliminacion</h2>
            <p>Estas seguro de que deseas eliminar el vehiculo:</p>
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