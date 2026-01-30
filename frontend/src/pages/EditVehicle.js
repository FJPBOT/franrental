import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import categoryService from '../services/categoryService';
import featureService from '../services/featureService';
import './EditVehicle.css';

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    image: '',
    featureIds: []
  });
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vehicleData, categoriesData, featuresData] = await Promise.all([
        vehicleService.getById(id),
        categoryService.getAll(),
        featureService.getAll()
      ]);
      
      setFormData({
        name: vehicleData.name,
        description: vehicleData.description,
        categoryId: vehicleData.categoryId || '',
        image: vehicleData.image || '',
        featureIds: vehicleData.features.map(f => f.id) || []
      });
      
      setCategories(categoriesData);
      setFeatures(featuresData);
    } catch (err) {
      setError('Error al cargar el vehiculo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es obligatorio';
        } else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        } else if (value.length > 100) {
          error = 'El nombre no puede superar los 100 caracteres';
        }
        break;

      case 'description':
        if (!value.trim()) {
          error = 'La descripcion es obligatoria';
        } else if (value.trim().length < 10) {
          error = 'La descripcion debe tener al menos 10 caracteres';
        } else if (value.length > 1000) {
          error = 'La descripcion no puede superar los 1000 caracteres';
        }
        break;

      case 'image':
        if (!value.trim()) {
          error = 'La imagen es obligatoria';
        } else {
          try {
            new URL(value);
            if (!value.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
              error = 'La URL debe apuntar a una imagen valida (jpg, png, gif, webp)';
            }
          } catch {
            error = 'Debe ser una URL valida';
          }
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setValidationErrors({
        ...validationErrors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setValidationErrors({
      ...validationErrors,
      [name]: error
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

  const validateForm = () => {
    const errors = {};
    errors.name = validateField('name', formData.name);
    errors.description = validateField('description', formData.description);
    errors.image = validateField('image', formData.image);

    setValidationErrors(errors);
    setTouched({
      name: true,
      description: true,
      image: true
    });

    return !errors.name && !errors.description && !errors.image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Por favor corrige los errores antes de continuar');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const dataToSend = {
        ...formData,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
      };
      await vehicleService.update(id, dataToSend);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/list');
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Ya existe un vehiculo con ese nombre');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al actualizar el vehiculo');
      } else {
        setError('Error al actualizar el vehiculo');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/admin/list');
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="edit-vehicle-container">
      <div className="edit-vehicle-header">
        <h1>Editar Vehiculo</h1>
        <button onClick={handleBack} className="btn-back">Volver</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-vehicle-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Vehiculo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: Toyota Corolla 2023"
            className={validationErrors.name && touched.name ? 'input-error' : ''}
          />
          {validationErrors.name && touched.name && (
            <span className="error-message">{validationErrors.name}</span>
          )}
          <small className="field-hint">Minimo 3 caracteres, maximo 100</small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripcion *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe las caracteristicas del vehiculo..."
            rows="5"
            className={validationErrors.description && touched.description ? 'input-error' : ''}
          />
          {validationErrors.description && touched.description && (
            <span className="error-message">{validationErrors.description}</span>
          )}
          <small className="field-hint">Minimo 10 caracteres, maximo 1000</small>
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
          <label htmlFor="image">URL de la Imagen *</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://ejemplo.com/imagen.jpg"
            className={validationErrors.image && touched.image ? 'input-error' : ''}
          />
          {validationErrors.image && touched.image && (
            <span className="error-message">{validationErrors.image}</span>
          )}
          <small className="field-hint">Debe ser una URL valida de imagen</small>
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
            Vehiculo actualizado exitosamente! Redirigiendo...
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVehicle;