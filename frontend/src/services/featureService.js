import axios from 'axios';

const API_URL = 'http://localhost:8080/api/features';

const featureService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (featureData) => {
    const response = await axios.post(API_URL, featureData);
    return response.data;
  },

  update: async (id, featureData) => {
    const response = await axios.put(`${API_URL}/${id}`, featureData);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};

export default featureService;