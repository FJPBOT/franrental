import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import favoriteService from '../services/favoriteService';
import './VehicleCard.css';

function VehicleCard({ vehicle, onClick, isFavorite, onFavoriteChange }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Debes iniciar sesion para agregar favoritos');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await favoriteService.remove(user.id, vehicle.id);
      } else {
        await favoriteService.add(user.id, vehicle.id);
      }
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (err) {
      console.error('Error con favorito:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-card" onClick={() => onClick(vehicle.id)}>
      {user && (
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          disabled={loading}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      )}
      
      <div className="vehicle-image-container">
        {vehicle.image ? (
          <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
        ) : (
          <div className="vehicle-image-placeholder">Sin imagen</div>
        )}
      </div>
      
      <div className="vehicle-info">
        <h3 className="vehicle-name">{vehicle.name}</h3>
        {vehicle.categoryTitle && (
          <p className="vehicle-category">{vehicle.categoryTitle}</p>
        )}
        <p className="vehicle-description">{vehicle.description.substring(0, 80)}...</p>
      </div>
    </div>
  );
}

export default VehicleCard;