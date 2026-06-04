import apiClient from '../api/axiosClient';

export const biodataService = {
  getMyBiodata: async () => {
    const res = await apiClient.get('/biodata/me');
    return res.data;
  },

  createBiodata: async (data) => {
    const res = await apiClient.post('/biodata', data);
    return res.data;
  },

  updateBiodata: async (id, data) => {
    const res = await apiClient.put(`/biodata/${id}`, data);
    return res.data;
  },

  deleteBiodata: async (id) => {
    const res = await apiClient.delete(`/biodata/${id}`);
    return res.data;
  },
};

export const adminService = {
  getAllCandidates: async (params) => {
    const res = await apiClient.get('/admin/candidates', { params });
    return res.data;
  },

  getCandidateDetail: async (id) => {
    const res = await apiClient.get(`/admin/candidates/${id}`);
    return res.data;
  },

  deleteCandidate: async (id) => {
    const res = await apiClient.delete(`/admin/candidates/${id}`);
    return res.data;
  },
};
