import api from './api';

export const progressService = {
  // LeetCode Progress
  getAllLeetcodeProgress: async () => {
    const response = await api.get('/progress/leetcode');
    return response.data;
  },

  getLeetcodeProgress: async (listName) => {
    const response = await api.get(`/progress/leetcode/${listName}`);
    return response.data;
  },

  updateLeetcodeProgress: async (listName, problemId, updateData) => {
    const response = await api.post('/progress/leetcode', {
      listName,
      problemId,
      updateData,
    });
    return response.data;
  },

  // Interview Progress
  getInterviewProgress: async () => {
    const response = await api.get('/progress/interview');
    return response.data;
  },

  updateInterviewProgress: async (itemId, completed) => {
    const response = await api.post('/progress/interview', {
      itemId,
      completed,
    });
    return response.data;
  },

  // Preferences
  getPreferences: async () => {
    const response = await api.get('/progress/preferences');
    return response.data;
  },

  updatePreferences: async (theme) => {
    const response = await api.post('/progress/preferences', {
      theme,
    });
    return response.data;
  },
};
