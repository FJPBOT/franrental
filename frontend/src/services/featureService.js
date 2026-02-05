import api from './axiosConfig';

const featureService = {
  getAll: async () => {
    const response = await api.get('/features');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/features/${id}`);
    return response.data;
  },

  create: async (featureData) => {
    const response = await api.post('/features', featureData);
    return response.data;
  },

  update: async (id, featureData) => {
    const response = await api.put(`/features/${id}`, featureData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/features/${id}`);
  }
};

export default featureService;
