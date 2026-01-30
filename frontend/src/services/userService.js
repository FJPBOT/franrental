import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const userService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  updateRole: async (id, role) => {
    const response = await axios.put(`${API_URL}/${id}/role?role=${role}`);
    return response.data;
  }
};

export default userService;