import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService';
import VehicleCard from '../components/VehicleCard';
import './Home.css';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getRandom(10);
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los vehículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleClick = (id) => {
    window.location.href = `/vehicle/${id}`;
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Cargando vehículos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="home-header">
        <h1>Vehículos Disponibles</h1>
        <p>Encuentra el vehículo perfecto para tu próximo viaje</p>
      </section>

      <section className="vehicles-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onClick={handleVehicleClick}
          />
        ))}
      </section>

      {vehicles.length === 0 && (
        <div className="no-vehicles">
          <p>No hay vehículos disponibles en este momento</p>
        </div>
      )}
    </div>
  );
}

export default Home;