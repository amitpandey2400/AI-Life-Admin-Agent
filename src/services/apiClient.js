// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Storage for JWT token
let authToken = localStorage.getItem('authToken') || null;

// Set auth token
export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Get auth token
export const getAuthToken = () => authToken;

// Helper function to make API requests
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ AUTH API ============
export const authAPI = {
  signup: (name, email, password) =>
    apiCall('/auth/signup', 'POST', { name, email, password }),

  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),

  getCurrentUser: () => apiCall('/auth/me', 'GET'),
};

// ============ TASKS API ============
export const tasksAPI = {
  getAllTasks: () => apiCall('/tasks', 'GET'),

  getTaskById: (id) => apiCall(`/tasks/${id}`, 'GET'),

  createTask: (taskData) =>
    apiCall('/tasks', 'POST', taskData),

  updateTask: (id, taskData) =>
    apiCall(`/tasks/${id}`, 'PUT', taskData),

  deleteTask: (id) => apiCall(`/tasks/${id}`, 'DELETE'),
};

// ============ REMINDERS API ============
export const remindersAPI = {
  getAllReminders: () => apiCall('/reminders', 'GET'),

  getReminderById: (id) => apiCall(`/reminders/${id}`, 'GET'),

  createReminder: (reminderData) =>
    apiCall('/reminders', 'POST', reminderData),

  updateReminder: (id, reminderData) =>
    apiCall(`/reminders/${id}`, 'PUT', reminderData),

  deleteReminder: (id) => apiCall(`/reminders/${id}`, 'DELETE'),
};

// ============ DOCUMENTS API ============
export const documentsAPI = {
  getAllDocuments: () => apiCall('/documents', 'GET'),

  getDocumentById: (id) => apiCall(`/documents/${id}`, 'GET'),

  createDocument: (documentData) =>
    apiCall('/documents', 'POST', documentData),

  updateDocument: (id, documentData) =>
    apiCall(`/documents/${id}`, 'PUT', documentData),

  deleteDocument: (id) => apiCall(`/documents/${id}`, 'DELETE'),

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  },
};

// ============ CHAT API ============
export const chatAPI = {
  sendMessage: (message) =>
    apiCall('/chat', 'POST', { message }),
};

export default {
  authAPI,
  tasksAPI,
  remindersAPI,
  documentsAPI,
  chatAPI,
  setAuthToken,
  getAuthToken,
};
