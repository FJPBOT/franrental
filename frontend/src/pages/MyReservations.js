import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import reservationService from '../services/reservationService';
import './MyReservations.css';

function MyReservations() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadReservations();
    }
  }, [user]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getByUser(user.id);
      setReservations(data);
    } catch (err) {
      console.error('Error loading reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'PENDING':
        return 'status-pending';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmada';
      case 'PENDING':
        return 'Pendiente';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="reservations-container">
        <h2>Debes iniciar sesion para ver tus reservas</h2>
        <button onClick={() => navigate('/login')} className="btn-primary">
          Iniciar Sesion
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Cargando reservas...</div>;
  }

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <h1>Mis Reservas</h1>
        <button onClick={() => navigate('/')} className="btn-back">Volver</button>
      </div>

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>No tienes reservas</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Ver Vehiculos
          </button>
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-image">
                {reservation.vehicleImage ? (
                  <img src={reservation.vehicleImage} alt={reservation.vehicleName} />
                ) : (
                  <div className="no-image">Sin imagen</div>
                )}
              </div>
              
              <div className="reservation-details">
                <h3>{reservation.vehicleName}</h3>
                <div className="reservation-dates">
                  <span>Desde: {new Date(reservation.startDate).toLocaleDateString('es-ES')}</span>
                  <span>Hasta: {new Date(reservation.endDate).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="reservation-info">
                  <span>{reservation.totalDays} dias</span>
                  <span className="price">${reservation.totalPrice}</span>
                </div>
                <div className="reservation-meta">
                  <span className={`status-badge ${getStatusBadgeClass(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                  <span className="created-at">Creada: {reservation.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservations;