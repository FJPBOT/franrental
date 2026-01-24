import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">FR</h2>
        <p className="footer-text">© {currentYear} FranRental. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;