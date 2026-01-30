import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && user.role !== 'ADMIN') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos de administrador</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary">
          Volver al inicio
        </button>
      </div>
    );
  }
  
  return children;
}

export default ProtectedRoute;