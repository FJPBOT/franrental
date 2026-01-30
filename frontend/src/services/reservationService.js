import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservations';

const reservationService = {
  create: async (reservationData) => {
    const response = await axios.post(API_URL, reservationData);
    return response.data;
  },

  getByUser: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  getByVehicle: async (vehicleId) => {
    const response = await axios.get(`${API_URL}/vehicle/${vehicleId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await axios.patch(`${API_URL}/${id}/status?status=${status}`);
    return response.data;
  },

  getUnavailableDates: async (vehicleId) => {
    const response = await axios.get(`${API_URL}/vehicle/${vehicleId}/unavailable-dates`);
    return response.data;
  }
};

export default reservationService;