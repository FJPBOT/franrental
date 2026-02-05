import api from './axiosConfig';

const reservationService = {
  create: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  getByUser: async (userId) => {
    const response = await api.get(`/reservations/user/${userId}`);
    return response.data;
  },

  getByVehicle: async (vehicleId) => {
    const response = await api.get(`/reservations/vehicle/${vehicleId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/reservations/${id}/status?status=${status}`);
    return response.data;
  },

  getUnavailableDates: async (vehicleId) => {
    const response = await api.get(`/reservations/vehicle/${vehicleId}/unavailable-dates`);
    return response.data;
  }
};

export default reservationService;
