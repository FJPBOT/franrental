import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserMenu from './UserMenu';
import './Header.css';

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <div className="header-left" onClick={() => window.location.href = '/'}>
        <h1 className="logo">FranRental</h1>
        <p className="slogan">Tu viaje comienza aqui</p>
      </div>
      <div className="header-right">
        {user ? (
          <UserMenu user={user} onLogout={logout} />
        ) : (
          <>
            <button className="btn-secondary" onClick={handleRegister}>
              Crear cuenta
            </button>
            <button className="btn-primary" onClick={handleLogin}>
              Iniciar sesion
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;