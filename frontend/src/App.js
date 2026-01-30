import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute.js';
import Home from './pages/Home';
import VehicleDetail from './pages/VehicleDetail';
import Admin from './pages/Admin';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import ListVehicles from './pages/ListVehicles';
import AdminCategories from './pages/AdminCategories';
import AdminFeatures from './pages/AdminFeatures';
import Register from './pages/Register';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import ReserveVehicle from './pages/ReserveVehicle';
import MyReservations from './pages/MyReservations';
import AdminReservations from './pages/AdminReservations';
import AdminUsers from './pages/AdminUsers';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } />
            
            <Route path="/administracion" element={<Navigate to="/admin" replace />} />
            
            <Route path="/admin/add" element={
              <ProtectedRoute requireAdmin={true}>
                <AddVehicle />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/edit/:id" element={
              <ProtectedRoute requireAdmin={true}>
                <EditVehicle />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/list" element={
              <ProtectedRoute requireAdmin={true}>
                <ListVehicles />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminCategories />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/features" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminFeatures />
              </ProtectedRoute>
            } />

            <Route path="/reserve/:id" element={<ReserveVehicle />} />

            <Route path="/my-reservations" element={<MyReservations />} />

            <Route path="/admin/reservations" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminReservations />
              </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminUsers />
              </ProtectedRoute>
            } />

            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h2>Pagina no encontrada</h2>
                <button onClick={() => window.location.href = '/'} className="btn-primary">
                  Volver al inicio
                </button>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;