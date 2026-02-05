import api from './axiosConfig';

const reviewService = {
  create: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  getByVehicle: async (vehicleId) => {
    const response = await api.get(`/reviews/vehicle/${vehicleId}`);
    return response.data;
  },

  getStats: async (vehicleId) => {
    const response = await api.get(`/reviews/vehicle/${vehicleId}/stats`);
    return response.data;
  }
};

export default reviewService;
