import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

const categoryService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (categoryData) => {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  },

  update: async (id, categoryData) => {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};

export default categoryService;