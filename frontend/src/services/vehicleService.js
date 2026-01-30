import axios from 'axios';

const API_URL = 'http://localhost:8080/api/vehicles';

const vehicleService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}?page=0&size=1000`);
    return response.data.content;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getRandom: async (limit = 10) => {
    const response = await axios.get(`${API_URL}/random?limit=${limit}`);
    return response.data;
  },

  getPaginated: async (page = 0, size = 10) => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
  },

  create: async (vehicleData) => {
    const response = await axios.post(API_URL, vehicleData);
    return response.data;
  },

  update: async (id, vehicleData) => {
    const response = await axios.put(`${API_URL}/${id}`, vehicleData);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};

export default vehicleService;