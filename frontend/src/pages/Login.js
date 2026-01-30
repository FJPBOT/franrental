import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Ingresa un email valido';
        }
        break;

      case 'password':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (value.length < 1) {
          error = 'Ingresa tu contraseña';
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

  const validateForm = () => {
    const errors = {};
    errors.email = validateField('email', formData.email);
    errors.password = validateField('password', formData.password);

    setValidationErrors(errors);
    setTouched({
      email: true,
      password: true
    });

    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Por favor corrige los errores antes de continuar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await userService.login(formData);
      login(userData);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email o contraseña incorrectos');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al iniciar sesion');
      } else {
        setError('Error al iniciar sesion. Intenta nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesion</h1>
        <p className="login-subtitle">Bienvenido de nuevo a FranRental</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="tu@email.com"
              className={validationErrors.email && touched.email ? 'input-error' : ''}
            />
            {validationErrors.email && touched.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={validationErrors.password && touched.password ? 'input-error' : ''}
            />
            {validationErrors.password && touched.password && (
              <span className="error-message">{validationErrors.password}</span>
            )}
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>

          <p className="register-link">
            No tienes cuenta? <button type="button" onClick={() => navigate('/register')} className="link-button">Registrate</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;