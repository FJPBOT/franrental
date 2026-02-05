import api from './axiosConfig';

const userService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  updateRole: async (id, role) => {
    const response = await api.put(`/users/${id}/role?role=${role}`);
    return response.data;
  }
};

export default userService;
