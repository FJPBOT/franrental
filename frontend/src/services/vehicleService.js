import api from './axiosConfig';

const vehicleService = {
  getAll: async () => {
    const response = await api.get('/vehicles?page=0&size=1000');
    return response.data.content;
  },

  getById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  getRandom: async (limit = 10) => {
    const response = await api.get(`/vehicles/random?limit=${limit}`);
    return response.data;
  },

  getPaginated: async (page = 0, size = 10) => {
    const response = await api.get(`/vehicles?page=${page}&size=${size}`);
    return response.data;
  },

  create: async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  update: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/vehicles/${id}`);
  }
};

export default vehicleService;
