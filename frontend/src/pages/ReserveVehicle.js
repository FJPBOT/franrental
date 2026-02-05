import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../context/AuthContext';
import vehicleService from '../services/vehicleService';
import reservationService from '../services/reservationService';
import 'react-datepicker/dist/react-datepicker.css';
import './ReserveVehicle.css';

function ReserveVehicle() {
  const { id: vehicleId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [comments, setComments] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [createdReservation, setCreatedReservation] = useState(null);
  const DAILY_RATE = 50;

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/reserve/${vehicleId}`, message: 'Debes iniciar sesion para realizar una reserva. Si no tienes cuenta, registrate primero.' } });
      return;
    }
    loadData();
  }, [vehicleId, user]);

  useEffect(() => {
    if (startDate && endDate) {
      calculatePrice();
    }
  }, [startDate, endDate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const vehicleData = await vehicleService.getById(vehicleId);
      setVehicle(vehicleData);

      const unavailable = await reservationService.getUnavailableDates(vehicleId);
      setUnavailableDates(unavailable.map(date => new Date(date)));

      setError(null);
    } catch (err) {
      setError('Error al cargar el vehiculo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setTotalPrice(days * DAILY_RATE);
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      unavailable => unavailable.toDateString() === date.toDateString()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError('Selecciona las fechas de inicio y fin');
      return;
    }

    if (startDate < new Date()) {
      setError('La fecha de inicio no puede ser en el pasado');
      return;
    }

    if (endDate < startDate) {
      setError('La fecha de fin debe ser posterior a la de inicio');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const reservation = await reservationService.create({
        userId: user.id,
        vehicleId: parseInt(vehicleId),
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        comments: comments || null
      });

      setCreatedReservation(reservation);
      setReservationSuccess(true);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('El vehiculo no esta disponible para las fechas seleccionadas');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al crear la reserva');
      } else {
        setError('Error al crear la reserva');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error && !vehicle) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn-primary">Volver al inicio</button>
      </div>
    );
  }

  if (reservationSuccess) {
    return (
      <div className="reserve-container">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Reserva Confirmada</h1>
          <p>Tu reserva se ha realizado con exito</p>

          <div className="success-details">
            <div className="detail-row">
              <span>Vehiculo:</span>
              <span>{vehicle.name}</span>
            </div>
            <div className="detail-row">
              <span>Fecha de inicio:</span>
              <span>{startDate.toLocaleDateString('es-ES')}</span>
            </div>
            <div className="detail-row">
              <span>Fecha de fin:</span>
              <span>{endDate.toLocaleDateString('es-ES')}</span>
            </div>
            <div className="detail-row">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
            {comments && (
              <div className="detail-row">
                <span>Comentarios:</span>
                <span>{comments}</span>
              </div>
            )}
          </div>

          <div className="success-actions">
            <button onClick={() => navigate('/my-reservations')} className="btn-primary">
              Ver Mis Reservas
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reserve-container">
      <div className="reserve-header">
        <h1>Reservar Vehiculo</h1>
        <button onClick={() => navigate(`/vehicle/${vehicleId}`)} className="btn-back">Volver</button>
      </div>

      <div className="reserve-content">
        <div className="vehicle-summary">
          {vehicle.image && (
            <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
          )}
          <h2>{vehicle.name}</h2>
          <p className="vehicle-description">{vehicle.description}</p>
          <div className="price-info">
            <span className="daily-rate">${DAILY_RATE} / dia</span>
          </div>
        </div>

        <div className="reservation-form">
          <div className="user-info-section">
            <h3>Datos del Usuario</h3>
            <div className="user-info">
              <div className="info-row">
                <span>Nombre:</span>
                <span>{user.name} {user.lastName}</span>
              </div>
              <div className="info-row">
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="date-selectors">
              <div className="form-group">
                <label>Fecha de Inicio</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  excludeDates={unavailableDates}
                  filterDate={(date) => !isDateUnavailable(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona fecha de inicio"
                  className="date-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Fecha de Fin</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  excludeDates={unavailableDates}
                  filterDate={(date) => !isDateUnavailable(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona fecha de fin"
                  className="date-input"
                  required
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className="selected-dates">
                <p>Periodo seleccionado: {startDate.toLocaleDateString('es-ES')} - {endDate.toLocaleDateString('es-ES')}</p>
              </div>
            )}

            <div className="form-group">
              <label>Comentarios o notas (opcional)</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Agrega cualquier comentario o solicitud especial..."
                rows="3"
                maxLength="500"
                className="comments-input"
              />
            </div>

            {startDate && endDate && (
              <div className="price-summary">
                <div className="summary-row">
                  <span>Dias:</span>
                  <span>{Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}</span>
                </div>
                <div className="summary-row">
                  <span>Precio por dia:</span>
                  <span>${DAILY_RATE}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary btn-reserve" disabled={submitting}>
              {submitting ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserveVehicle;
