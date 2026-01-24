import React, { useState, useContext } from 'react';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
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
      const user = await authService.login(formData);
      login(user);
      window.location.href = '/';
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email o contraseña incorrectos');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al iniciar sesion');
      } else {
        setError('Error al iniciar sesion');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesion</h1>
        <p className="login-subtitle">Ingresa a tu cuenta de FranRental</p>

        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Tu contraseña"
              required
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
              {loading ? 'Iniciando...' : 'Iniciar Sesion'}
            </button>
          </div>
        </form>

        <p className="login-footer">
          No tienes cuenta? <span onClick={() => window.location.href = '/register'} className="link">Registrate</span>
        </p>
      </div>
    </div>
  );
}

export default Login;