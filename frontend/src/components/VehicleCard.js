import React from 'react';
import './VehicleCard.css';

function VehicleCard({ vehicle, onClick }) {
  return (
    <div className="vehicle-card" onClick={() => onClick(vehicle.id)}>
      <div className="vehicle-image-container">
        {vehicle.image ? (
          <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
        ) : (
          <div className="vehicle-image-placeholder">Sin imagen</div>
        )}
      </div>
      <div className="vehicle-info">
        <h3 className="vehicle-name">{vehicle.name}</h3>
        <p className="vehicle-category">{vehicle.category}</p>
        <p className="vehicle-description">{vehicle.description.substring(0, 80)}...</p>
      </div>
    </div>
  );
}

export default VehicleCard;