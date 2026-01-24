import React, { useState } from 'react';
import './UserMenu.css';

function UserMenu({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getInitials = () => {
    return `${user.name.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="user-menu">
      <div className="user-avatar" onClick={toggleMenu}>
        {getInitials()}
      </div>
      {menuOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-name">{user.name} {user.lastName}</p>
            <p className="user-email">{user.email}</p>
            <p className="user-role">{user.role}</p>
          </div>
          <div className="user-actions">
            {user.role === 'ADMIN' && (
              <button onClick={() => window.location.href = '/admin'} className="menu-item">
                Panel Admin
              </button>
            )}
            <button onClick={onLogout} className="menu-item logout">
              Cerrar Sesion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;