import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import favoriteService from '../services/favoriteService';
import VehicleCard from '../components/VehicleCard';
import './Favorites.css';

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getByUser(user.id);
      setFavorites(data);
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="favorites-container">
        <h2>Debes iniciar sesion para ver tus favoritos</h2>
        <button onClick={() => window.location.href = '/login'} className="btn-primary">
          Iniciar Sesion
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Cargando favoritos...</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Mis Favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No tienes vehiculos favoritos</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Ver Vehiculos
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <VehicleCard 
              key={fav.id} 
              vehicle={fav.vehicle} 
              onClick={(id) => window.location.href = `/vehicle/${id}`}
              isFavorite={true}
              onFavoriteChange={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;