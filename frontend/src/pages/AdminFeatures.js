import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import featureService from '../services/featureService';
import './AdminFeatures.css';

function AdminFeatures() {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    iconUrl: ''
  });

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await featureService.getAll();
      setFeatures(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las caracteristicas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await featureService.create(formData);
      setFormData({ name: '', iconUrl: '' });
      loadFeatures();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Ya existe una caracteristica con ese nombre');
      } else {
        alert('Error al crear la caracteristica');
      }
      console.error(err);
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature.id);
    setFormData({
      name: feature.name,
      iconUrl: feature.iconUrl
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await featureService.update(editingId, formData);
      setEditingId(null);
      setFormData({ name: '', iconUrl: '' });
      loadFeatures();
    } catch (err) {
      alert('Error al actualizar la caracteristica');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', iconUrl: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Estas seguro de eliminar esta caracteristica?')) {
      try {
        await featureService.delete(id);
        loadFeatures();
      } catch (err) {
        alert('Error al eliminar la caracteristica');
        console.error(err);
      }
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="admin-features-container">
        <div className="loading">Cargando caracteristicas...</div>
      </div>
    );
  }

  return (
    <div className="admin-features-container">
      <div className="admin-features-header">
        <h1>Administrar Caracteristicas</h1>
        <button onClick={handleBack} className="btn-back">← Volver</button>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      <div className="features-form-section">
        <h2>{editingId ? 'Editar Caracteristica' : 'Crear Nueva Caracteristica'}</h2>
        <form onSubmit={editingId ? handleUpdate : handleSubmit} className="feature-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: GPS, Aire Acondicionado"
              required
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="iconUrl">URL del Icono</label>
            <input
              type="url"
              id="iconUrl"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/icono.png"
              required
            />
            <small className="field-hint">Debe ser una URL valida de imagen</small>
          </div>

          <div className="form-actions">
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="btn-secondary">
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-primary">
              {editingId ? 'Guardar' : 'Crear Caracteristica'}
            </button>
          </div>
        </form>
      </div>

      <div className="features-list-section">
        <h2>Caracteristicas Existentes</h2>
        {features.length === 0 ? (
          <p className="no-features">No hay caracteristicas creadas</p>
        ) : (
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  {isValidUrl(feature.iconUrl) ? (
                    <img src={feature.iconUrl} alt={feature.name} />
                  ) : (
                    <span className="icon-text">{feature.iconUrl}</span>
                  )}
                </div>
                <div className="feature-info">
                  <h3>{feature.name}</h3>
                </div>
                <div className="feature-actions">
                  <button onClick={() => handleEdit(feature)} className="btn-edit">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(feature.id)} className="btn-delete">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFeatures;