import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserMenu from './UserMenu';
import './Header.css';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate('/')}>
        <h1 className="logo">FranRental</h1>
        <p className="slogan">Tu viaje comienza aqui</p>
      </div>
      <div className="header-right">
        {user && (
          <>
            <button className="btn-favorites" onClick={() => navigate('/favorites')}>
              Favoritos
            </button>
            <button className="btn-reservations" onClick={() => navigate('/my-reservations')}>
              Mis Reservas
            </button>
          </>
        )}
        {user ? (
          <UserMenu user={user} onLogout={logout} />
        ) : (
          <>
            <button className="btn-secondary" onClick={() => navigate('/register')}>
              Crear cuenta
            </button>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Iniciar sesion
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;