import axios from 'axios';

const API_URL = 'http://localhost:8080/api/favorites';

const favoriteService = {
  add: async (userId, vehicleId) => {
    const response = await axios.post(`${API_URL}?userId=${userId}&vehicleId=${vehicleId}`);
    return response.data;
  },

  getByUser: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  remove: async (userId, vehicleId) => {
    await axios.delete(`${API_URL}?userId=${userId}&vehicleId=${vehicleId}`);
  }
};

export default favoriteService;