import api from './axiosConfig';

const favoriteService = {
  add: async (userId, vehicleId) => {
    const response = await api.post(`/favorites?userId=${userId}&vehicleId=${vehicleId}`);
    return response.data;
  },

  getByUser: async (userId) => {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  },

  remove: async (userId, vehicleId) => {
    await api.delete(`/favorites?userId=${userId}&vehicleId=${vehicleId}`);
  }
};

export default favoriteService;
