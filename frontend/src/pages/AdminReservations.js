import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reservationService from '../services/reservationService';
import './AdminReservations.css';

function AdminReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getAll();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las reservas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day).toLocaleDateString('es-ES');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reservationService.updateStatus(id, newStatus);
      loadReservations();
    } catch (err) {
      alert('Error al actualizar el estado');
      console.error(err);
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

  const handleBack = () => {
    navigate('/admin');
  };

  if (loading) {
    return <div className="loading">Cargando reservas...</div>;
  }

  return (
    <div className="admin-reservations-container">
      <div className="admin-reservations-header">
        <h1>Administrar Reservas</h1>
        <button onClick={handleBack} className="btn-back">Volver</button>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>No hay reservas registradas</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Vehiculo</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Dias</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.userName}</td>
                  <td>{reservation.vehicleName}</td>
                  <td>{formatDate(reservation.startDate)}</td>
                  <td>{formatDate(reservation.endDate)}</td>
                  <td>{reservation.totalDays}</td>
                  <td className="price">${reservation.totalPrice}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="PENDING">Pendiente</option>
                      <option value="CONFIRMED">Confirmada</option>
                      <option value="CANCELLED">Cancelada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminReservations;
