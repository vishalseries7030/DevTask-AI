import api from './api';

export const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (name, description, members = []) => {
    const response = await api.post('/projects', { name, description, members });
    return response.data;
  },

  updateProject: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
};
