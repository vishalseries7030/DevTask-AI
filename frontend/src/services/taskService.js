import api from './api';

export const taskService = {
  getTasks: async (projectId, status = null) => {
    const params = status ? { status } : {};
    const response = await api.get(`/projects/${projectId}/tasks`, { params });
    return response.data;
  },

  createTask: async (projectId, taskData) => {
    const response = await api.post(`/projects/${projectId}/tasks`, taskData);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};
