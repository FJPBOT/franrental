import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService';
import './VehicleDetail.css';

function VehicleDetail({ vehicleId }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicle();
  }, [vehicleId]);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getById(vehicleId);
      setVehicle(data);
      setError(null);
    } catch (err) {
      setError('Vehiculo no encontrado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error || !vehicle) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={handleBack} className="btn-primary">Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1>{vehicle.name}</h1>
        <button onClick={handleBack} className="btn-back">← Volver</button>
      </div>

      <div className="detail-content">
        <div className="detail-image-section">
          {vehicle.image ? (
            <img src={vehicle.image} alt={vehicle.name} className="detail-image" />
          ) : (
            <div className="detail-image-placeholder">Sin imagen</div>
          )}
        </div>

        <div className="detail-info-section">
          {vehicle.categoryTitle && (
            <div className="info-item">
              <label>Categoria:</label>
              <span className="category-badge">{vehicle.categoryTitle}</span>
            </div>
          )}

          <div className="info-item">
            <label>Descripcion:</label>
            <p className="description-text">{vehicle.description}</p>
          </div>

          {vehicle.features && vehicle.features.length > 0 && (
            <div className="info-item">
              <label>Caracteristicas:</label>
              <div className="features-list">
                {vehicle.features.map((feature) => (
                  <div key={feature.id} className="feature-item">
                    {feature.iconUrl && (
                      <img src={feature.iconUrl} alt={feature.name} className="feature-icon" />
                    )}
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;