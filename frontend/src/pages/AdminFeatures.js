import React, { useState, useEffect } from 'react';
import featureService from '../services/featureService';
import './AdminFeatures.css';

function AdminFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
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
      setError('Error al cargar caracteristicas');
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
      if (editingFeature) {
        await featureService.update(editingFeature.id, formData);
      } else {
        await featureService.create(formData);
      }
      setFormData({ name: '', iconUrl: '' });
      setShowForm(false);
      setEditingFeature(null);
      loadFeatures();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al guardar caracteristica');
    }
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setFormData({
      name: feature.name,
      iconUrl: feature.iconUrl || ''
    });
    setShowForm(true);
  };

  const handleDeleteClick = (feature) => {
    setDeleteConfirm(feature);
  };

  const handleDeleteConfirm = async () => {
    try {
      await featureService.delete(deleteConfirm.id);
      setFeatures(features.filter(f => f.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar caracteristica');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', iconUrl: '' });
    setShowForm(false);
    setEditingFeature(null);
  };

  if (loading) {
    return <div className="loading">Cargando caracteristicas...</div>;
  }

  return (
    <div className="admin-features-container">
      <div className="admin-features-header">
        <h1>Administrar Caracteristicas</h1>
        <button onClick={() => window.location.href = '/admin'} className="btn-back">
          Volver
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <button onClick={() => setShowForm(true)} className="btn-add">
        + Agregar Nueva Caracteristica
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{editingFeature ? 'Editar Caracteristica' : 'Nueva Caracteristica'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength="100"
              />
            </div>
            <div className="form-group">
              <label>URL del Icono</label>
              <input
                type="url"
                name="iconUrl"
                value={formData.iconUrl}
                onChange={handleChange}
                placeholder="https://ejemplo.com/icono.png"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                {editingFeature ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="features-list">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <div className="feature-info">
              {feature.iconUrl && (
                <img src={feature.iconUrl} alt={feature.name} className="feature-icon" />
              )}
              <h3>{feature.name}</h3>
            </div>
            <div className="feature-actions">
              <button onClick={() => handleEdit(feature)} className="btn-edit">
                Editar
              </button>
              <button onClick={() => handleDeleteClick(feature)} className="btn-delete">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar Eliminacion</h2>
            <p>Estas seguro de eliminar la caracteristica:</p>
            <p className="confirm-name">{deleteConfirm.name}</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirm} className="btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFeatures;