import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import vehicleService from '../services/vehicleService';
import categoryService from '../services/categoryService';
import favoriteService from '../services/favoriteService';
import VehicleCard from '../components/VehicleCard';
import './Home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadInitialData();
  }, [user]);

  useEffect(() => {
    filterAndPaginateVehicles();
  }, [currentPage, selectedCategory, searchTerm, allVehicles]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [vehiclesData, categoriesData] = await Promise.all([
        vehicleService.getAll(),
        categoryService.getAll()
      ]);

      setAllVehicles(vehiclesData);
      setCategories(categoriesData);

      if (user) {
        const favoritesData = await favoriteService.getByUser(user.id);
        setFavorites(favoritesData.map(f => f.vehicle.id));
      }

      setError(null);
    } catch (err) {
      setError('Error al cargar los vehículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    if (user) {
      try {
        const favoritesData = await favoriteService.getByUser(user.id);
        setFavorites(favoritesData.map(f => f.vehicle.id));
      } catch (err) {
        console.error('Error al cargar favoritos:', err);
      }
    }
  };

  const filterAndPaginateVehicles = () => {
    let filtered = [...allVehicles];

    if (selectedCategory) {
      filtered = filtered.filter(
        vehicle => vehicle.categoryId === parseInt(selectedCategory)
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(search) ||
        (vehicle.description && vehicle.description.toLowerCase().includes(search))
      );
    }

    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFiltered = filtered.slice(startIndex, endIndex);

    setVehicles(paginatedFiltered);
    setTotalElements(filtered.length);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  const getCategoryVehicleCount = (categoryId) => {
    return allVehicles.filter(v => v.categoryId === categoryId).length;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setCurrentPage(0);
  };

  const handleVehicleClick = (id) => {
    window.location.href = `/vehicle/${id}`;
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToFirstPage = () => goToPage(0);
  const goToLastPage = () => goToPage(totalPages - 1);
  const goToPrevPage = () => goToPage(Math.max(0, currentPage - 1));
  const goToNextPage = () => goToPage(Math.min(totalPages - 1, currentPage + 1));

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Cargando vehículos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="home-header">
        <h1>Vehículos Disponibles</h1>
        <p>Encuentra el vehículo perfecto para tu próximo viaje</p>
      </section>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>
      </section>

      <section className="filters-section">
        <div className="filter-group">
          <label htmlFor="category-filter">Filtrar por categoría:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">Todas las categorías ({allVehicles.length})</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title} ({getCategoryVehicleCount(category.id)})
              </option>
            ))}
          </select>
        </div>
        <div className="results-count">
          {totalElements} vehículo{totalElements !== 1 ? 's' : ''} encontrado{totalElements !== 1 ? 's' : ''}
        </div>
      </section>

      <section className="vehicles-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onClick={handleVehicleClick}
            isFavorite={favorites.includes(vehicle.id)}
            onFavoriteChange={() => { loadFavorites(); }}
          />
        ))}
      </section>

      {vehicles.length === 0 && (
        <div className="no-vehicles">
          <p>No hay vehículos que coincidan con tu búsqueda</p>
          <button onClick={clearFilters} className="btn-primary">
            Ver todos los vehículos
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <section className="pagination-section">
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={goToFirstPage}
              disabled={currentPage === 0}
              title="Ir al inicio"
            >
              «
            </button>
            <button
              className="pagination-btn"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              title="Página anterior"
            >
              ‹
            </button>

            <div className="pagination-info">
              Página {currentPage + 1} de {totalPages}
            </div>

            <button
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              title="Página siguiente"
            >
              ›
            </button>
            <button
              className="pagination-btn"
              onClick={goToLastPage}
              disabled={currentPage === totalPages - 1}
              title="Ir al final"
            >
              »
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
