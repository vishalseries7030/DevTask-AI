import api from './api';

export const snippetService = {
  getSnippets: async (language = null, tag = null) => {
    const params = {};
    if (language) params.language = language;
    if (tag) params.tag = tag;
    const response = await api.get('/snippets', { params });
    return response.data;
  },

  getSnippetById: async (id) => {
    const response = await api.get(`/snippets/${id}`);
    return response.data;
  },

  createSnippet: async (snippetData) => {
    const response = await api.post('/snippets', snippetData);
    return response.data;
  },

  deleteSnippet: async (id) => {
    const response = await api.delete(`/snippets/${id}`);
    return response.data;
  },
};
