import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import vehicleService from '../services/vehicleService';
import reviewService from '../services/reviewService';
import favoriteService from '../services/favoriteService';
import './VehicleDetail.css';

function VehicleDetail() {
  const { id: vehicleId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, reviewCount: 0 });
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, [vehicleId, user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const vehicleData = await vehicleService.getById(vehicleId);
      setVehicle(vehicleData);
      
      const reviewsData = await reviewService.getByVehicle(vehicleId);
      setReviews(reviewsData);
      
      const statsData = await reviewService.getStats(vehicleId);
      setStats(statsData);
      
      if (user) {
        const favoritesData = await favoriteService.getByUser(user.id);
        setIsFavorite(favoritesData.some(f => f.vehicle.id === parseInt(vehicleId)));
      }
      
      setError(null);
    } catch (err) {
      setError('Vehiculo no encontrado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert('Debes iniciar sesion para agregar favoritos');
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.remove(user.id, vehicleId);
        setIsFavorite(false);
      } else {
        await favoriteService.add(user.id, vehicleId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error con favorito:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Debes iniciar sesion para dejar una reseña');
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.create({
        userId: user.id,
        vehicleId: parseInt(vehicleId),
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      setReviewForm({ rating: 5, comment: '' });
      loadData();
    } catch (err) {
      alert('Error al enviar reseña');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copiado al portapapeles!');
  };

  const handleBack = () => {
    navigate('/');
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
        <div className="detail-actions">
  <button onClick={() => navigate(`/reserve/${vehicleId}`)} className="btn-reserve-now">
    Reservar Ahora
  </button>
  <button onClick={handleShare} className="btn-share">
    Compartir
  </button>
  {user && (
    <button onClick={handleFavoriteToggle} className="btn-favorite">
      {isFavorite ? 'Favorito' : 'Agregar a Favoritos'}
    </button>
  )}
  <button onClick={handleBack} className="btn-back">Volver</button>
</div>
      </div>

      <div className="rating-summary">
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} className={star <= Math.round(stats.averageRating) ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
        </div>
        <span className="rating-text">
          {stats.averageRating.toFixed(1)} ({stats.reviewCount} reseñas)
        </span>
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
                    {feature.iconUrl && isValidUrl(feature.iconUrl) && (
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

      <div className="policies-section">
        <h2>Politicas del Vehiculo</h2>
        <div className="policies-grid">
          <div className="policy-item">
            <h3>Que incluye</h3>
            <ul>
              <li>Seguro basico</li>
              <li>Mantenimiento incluido</li>
              <li>Asistencia en ruta 24/7</li>
            </ul>
          </div>
          <div className="policy-item">
            <h3>Que no incluye</h3>
            <ul>
              <li>Combustible</li>
              <li>Conductor adicional</li>
              <li>Peajes y estacionamiento</li>
            </ul>
          </div>
          <div className="policy-item">
            <h3>Requisitos</h3>
            <ul>
              <li>Licencia de conducir vigente</li>
              <li>Mayor de 21 años</li>
              <li>Tarjeta de credito</li>
            </ul>
          </div>
          <div className="policy-item">
            <h3>Cancelacion</h3>
            <ul>
              <li>Gratis hasta 24hs antes</li>
              <li>50% de cargo hasta 12hs antes</li>
              <li>No reembolsable despues</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reseñas de Clientes</h2>
        
        {user && (
          <div className="review-form">
            <h3>Deja tu opinion</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Calificacion:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={star <= reviewForm.rating ? 'star clickable filled' : 'star clickable'}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Comentario:</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="Comparte tu experiencia..."
                  maxLength="500"
                  rows="4"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </form>
          </div>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No hay reseñas aun. Se el primero en opinar!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">{review.userName}</div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= review.rating ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                {review.comment && <p className="review-comment">{review.comment}</p>}
                <div className="review-date">{review.createdAt}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;