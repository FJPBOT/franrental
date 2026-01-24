import React, { useState, useContext } from 'react';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

function Register() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await authService.register(formData);
      login(user);
      window.location.href = '/';
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('El email ya esta registrado');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al registrarse');
      } else {
        setError('Error al registrarse');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Crear Cuenta</h1>
        <p className="register-subtitle">Registrate para acceder a todas las funcionalidades</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Tu apellido"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimo 6 caracteres"
              required
              minLength="6"
            />
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleBack} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </div>
        </form>

        <p className="register-footer">
          Ya tienes cuenta? <span onClick={() => window.location.href = '/login'} className="link">Inicia sesion</span>
        </p>
      </div>
    </div>
  );
}

export default Register;