import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es obligatorio';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        } else if (value.length > 50) {
          error = 'El nombre no puede superar los 50 caracteres';
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          error = 'El apellido es obligatorio';
        } else if (value.trim().length < 2) {
          error = 'El apellido debe tener al menos 2 caracteres';
        } else if (value.length > 50) {
          error = 'El apellido no puede superar los 50 caracteres';
        }
        break;

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
        } else if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])/.test(value)) {
          error = 'Debe contener al menos una minuscula';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = 'Debe contener al menos una mayuscula';
        } else if (!/(?=.*\d)/.test(value)) {
          error = 'Debe contener al menos un numero';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Debes confirmar tu contraseña';
        } else if (value !== formData.password) {
          error = 'Las contraseñas no coinciden';
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

    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setValidationErrors({
        ...validationErrors,
        [name]: validateField(name, value),
        confirmPassword: confirmError
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
    errors.name = validateField('name', formData.name);
    errors.lastName = validateField('lastName', formData.lastName);
    errors.email = validateField('email', formData.email);
    errors.password = validateField('password', formData.password);
    errors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);

    setValidationErrors(errors);
    setTouched({
      name: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    return !errors.name && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword;
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
      const userData = await userService.register({
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      login(userData);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('El email ya esta registrado');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al registrarse');
      } else {
        setError('Error al registrarse. Intenta nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Crear Cuenta</h1>
        <p className="register-subtitle">Unete a FranRental</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Vero"
              className={validationErrors.name && touched.name ? 'input-error' : ''}
            />
            {validationErrors.name && touched.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Valdez"
              className={validationErrors.lastName && touched.lastName ? 'input-error' : ''}
            />
            {validationErrors.lastName && touched.lastName && (
              <span className="error-message">{validationErrors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="vero@valdez.com"
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
            <small className="field-hint">Minimo 8 caracteres, debe incluir mayuscula, minuscula y numero</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={validationErrors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            />
            {validationErrors.confirmPassword && touched.confirmPassword && (
              <span className="error-message">{validationErrors.confirmPassword}</span>
            )}
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          <p className="login-link">
            Ya tienes cuenta? <button type="button" onClick={() => navigate('/login')} className="link-button">Inicia sesion</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;