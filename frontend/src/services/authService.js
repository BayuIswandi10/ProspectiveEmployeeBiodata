import apiClient from '../api/axiosClient';

export const authService = {
  register: async (data) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },

  login: async (data) => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },

  logout: async () => {
    const res = await apiClient.post('/auth/logout');
    return res.data;
  },
};
