import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import './AdminUsers.css';

function AdminUsers() {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    // No permitir cambiar el rol del usuario actual
    if (userId === currentUser.id) {
      alert('No puedes cambiar tu propio rol');
      return;
    }

    try {
      setUpdatingId(userId);
      await userService.updateRole(userId, newRole);
      await loadUsers();
    } catch (err) {
      console.error('Error al actualizar rol:', err);
      alert('Error al actualizar el rol del usuario');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-users-container">
        <div className="loading">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <button className="btn-back" onClick={() => navigate('/admin')}>
          Volver al Panel
        </button>
        <h1>Administrar Usuarios</h1>
        <p>Gestiona los roles y permisos de los usuarios registrados</p>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <span className="stat-number">{users.length}</span>
          <span className="stat-label">Total Usuarios</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{users.filter(u => u.role === 'ADMIN').length}</span>
          <span className="stat-label">Administradores</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{users.filter(u => u.role === 'USER').length}</span>
          <span className="stat-label">Usuarios</span>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className={user.id === currentUser.id ? 'current-user' : ''}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.id === currentUser.id ? (
                    <span className="current-user-label">Tu cuenta</span>
                  ) : (
                    <div className="role-actions">
                      {updatingId === user.id ? (
                        <span className="updating">Actualizando...</span>
                      ) : (
                        <>
                          {user.role === 'USER' ? (
                            <button
                              className="btn-promote"
                              onClick={() => handleRoleChange(user.id, 'ADMIN')}
                              title="Promover a Administrador"
                            >
                              Hacer Admin
                            </button>
                          ) : (
                            <button
                              className="btn-demote"
                              onClick={() => handleRoleChange(user.id, 'USER')}
                              title="Quitar permisos de Administrador"
                            >
                              Quitar Admin
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="no-users">
          <p>No hay usuarios registrados</p>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
