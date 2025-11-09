import api from './api';

export const aiService = {
  suggestFix: async (bugTitle, bugDescription, logs = '', language = '') => {
    const response = await api.post('/ai/suggest-fix', {
      bugTitle,
      bugDescription,
      logs,
      language,
    });
    return response.data;
  },

  generateSnippet: async (prompt, language) => {
    const response = await api.post('/ai/generate-snippet', { prompt, language });
    return response.data;
  },
};
