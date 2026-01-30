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
  const DAILY_RATE = 50;

  useEffect(() => {
    loadData();
  }, [vehicleId]);

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

    if (!user) {
      alert('Debes iniciar sesion para hacer una reserva');
      navigate('/login');
      return;
    }

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
      await reservationService.create({
        userId: user.id,
        vehicleId: parseInt(vehicleId),
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
      
      alert('Reserva creada exitosamente!');
      navigate('/my-reservations');
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