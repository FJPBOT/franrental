import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reviews';

const reviewService = {
  create: async (reviewData) => {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
  },

  getByVehicle: async (vehicleId) => {
    const response = await axios.get(`${API_URL}/vehicle/${vehicleId}`);
    return response.data;
  },

  getStats: async (vehicleId) => {
    const response = await axios.get(`${API_URL}/vehicle/${vehicleId}/stats`);
    return response.data;
  }
};

export default reviewService;