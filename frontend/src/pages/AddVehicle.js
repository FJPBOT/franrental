import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService';
import categoryService from '../services/categoryService';
import featureService from '../services/featureService';
import './AddVehicle.css';

function AddVehicle() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    image: '',
    featureIds: []
  });
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCategoriesAndFeatures();
  }, []);

  const loadCategoriesAndFeatures = async () => {
    try {
      const [categoriesData, featuresData] = await Promise.all([
        categoryService.getAll(),
        featureService.getAll()
      ]);
      setCategories(categoriesData);
      setFeatures(featuresData);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeatureToggle = (featureId) => {
    const currentFeatures = formData.featureIds;
    if (currentFeatures.includes(featureId)) {
      setFormData({
        ...formData,
        featureIds: currentFeatures.filter(id => id !== featureId)
      });
    } else {
      setFormData({
        ...formData,
        featureIds: [...currentFeatures, featureId]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const dataToSend = {
        ...formData,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
      };
      await vehicleService.create(dataToSend);
      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        categoryId: '',
        image: '',
        featureIds: []
      });
      setTimeout(() => {
        window.location.href = '/admin/list';
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Ya existe un vehiculo con ese nombre');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al crear el vehiculo');
      } else {
        setError('Error al crear el vehiculo');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="add-vehicle-container">
      <div className="add-vehicle-header">
        <h1>Agregar Vehiculo</h1>
        <button onClick={handleBack} className="btn-back">← Volver</button>
      </div>

      <form onSubmit={handleSubmit} className="add-vehicle-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Vehiculo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Toyota Corolla 2023"
            required
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripcion *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe las caracteristicas del vehiculo..."
            required
            maxLength="1000"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Categoria</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Sin categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="form-group">
          <label>Caracteristicas</label>
          <div className="features-checkbox-list">
            {features.map(feature => (
              <label key={feature.id} className="feature-checkbox">
                <input
                  type="checkbox"
                  checked={formData.featureIds.includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                />
                <span>{feature.name}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            Vehiculo creado exitosamente! Redirigiendo...
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Vehiculo'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVehicle;