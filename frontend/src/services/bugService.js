import api from './api';

export const bugService = {
  getBugs: async (projectId, status = null) => {
    const params = status ? { status } : {};
    const response = await api.get(`/projects/${projectId}/bugs`, { params });
    return response.data;
  },

  getBugById: async (bugId) => {
    const response = await api.get(`/bugs/${bugId}`);
    return response.data;
  },

  createBug: async (projectId, bugData) => {
    const response = await api.post(`/projects/${projectId}/bugs`, bugData);
    return response.data;
  },

  updateBug: async (bugId, bugData) => {
    const response = await api.put(`/bugs/${bugId}`, bugData);
    return response.data;
  },
};
