import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VehicleDetail from './pages/VehicleDetail';
import Admin from './pages/Admin';
import AddVehicle from './pages/AddVehicle';
import ListVehicles from './pages/ListVehicles';
import AdminCategories from './pages/AdminCategories';
import AdminFeatures from './pages/AdminFeatures';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const path = window.location.pathname;
  const vehicleId = path.match(/^\/vehicle\/(\d+)$/)?.[1];

  let content;

  if (path === '/' || path === '') {
    content = <Home />;
  } else if (vehicleId) {
    content = <VehicleDetail vehicleId={vehicleId} />;
  } else if (path === '/register') {
    content = <Register />;
  } else if (path === '/login') {
    content = <Login />;
  } else if (path === '/admin' || path === '/administracion') {
    content = <Admin />;
  } else if (path === '/admin/add') {
    content = <AddVehicle />;
  } else if (path === '/admin/list') {
    content = <ListVehicles />;
  } else if (path === '/admin/categories') {
    content = <AdminCategories />;
  } else if (path === '/admin/features') {
    content = <AdminFeatures />;
  } else {
    content = (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Pagina no encontrada</h2>
        <button onClick={() => window.location.href = '/'} className="btn-primary">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {content}
      </main>
      <Footer />
    </div>
  );
}

export default App;