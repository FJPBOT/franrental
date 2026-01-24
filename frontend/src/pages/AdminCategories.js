import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import './AdminCategories.css';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar categorias');
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
      if (editingCategory) {
        await categoryService.update(editingCategory.id, formData);
      } else {
        await categoryService.create(formData);
      }
      setFormData({ title: '', description: '', imageUrl: '' });
      setShowForm(false);
      setEditingCategory(null);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al guardar categoria');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      description: category.description,
      imageUrl: category.imageUrl || ''
    });
    setShowForm(true);
  };

  const handleDeleteClick = (category) => {
    setDeleteConfirm(category);
  };

  const handleDeleteConfirm = async () => {
    try {
      await categoryService.delete(deleteConfirm.id);
      setCategories(categories.filter(c => c.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar categoria');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', imageUrl: '' });
    setShowForm(false);
    setEditingCategory(null);
  };

  if (loading) {
    return <div className="loading">Cargando categorias...</div>;
  }

  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <h1>Administrar Categorias</h1>
        <button onClick={() => window.location.href = '/admin'} className="btn-back">
          Volver
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <button onClick={() => setShowForm(true)} className="btn-add">
        + Agregar Nueva Categoria
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{editingCategory ? 'Editar Categoria' : 'Nueva Categoria'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength="100"
              />
            </div>
            <div className="form-group">
              <label>Descripcion</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength="500"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>URL de Imagen</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                {editingCategory ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-info">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="vehicle-count">{category.vehicleCount} vehiculos</span>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEdit(category)} className="btn-edit">
                Editar
              </button>
              <button onClick={() => handleDeleteClick(category)} className="btn-delete">
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
            <p>Estas seguro de eliminar la categoria:</p>
            <p className="confirm-name">{deleteConfirm.title}</p>
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

export default AdminCategories;