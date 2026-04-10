# Frontend Integration Guide

This guide helps you integrate the backend with your React frontend.

## 🔗 Quick Start Integration

### 1. Install Axios in Frontend
```bash
cd ..  # Go to frontend directory
npm install axios
```

### 2. Create API Service

Create `src/services/api.js` in your frontend:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3. Add Environment Variable

Create `.env` in frontend root:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Auth Hooks Example

Create `src/hooks/useAuth.js`:

```javascript
import { useState } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, signup, login, logout };
};
```

## 📡 API Usage Examples

### Chat Example
```javascript
import api from '../services/api';

const handleSendMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    console.log(response.data.data); // { reply, tasks }
  } catch (error) {
    console.error('Chat error:', error);
  }
};
```

### Tasks Example
```javascript
// Get all tasks
const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.data;
};

// Create task
const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data.data;
};

// Update task
const updateTask = async (taskId, updates) => {
  const response = await api.put(`/tasks/${taskId}`, updates);
  return response.data.data;
};

// Delete task
const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`);
};
```

### Reminders Example
```javascript
// Get reminders
const getReminders = async () => {
  const response = await api.get('/reminders');
  return response.data.data;
};

// Create reminder
const createReminder = async (reminderData) => {
  const response = await api.post('/reminders', reminderData);
  return response.data.data;
};
```

### Document Upload Example
```javascript
// Upload document
const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  const response = await api.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// Get documents
const getDocuments = async () => {
  const response = await api.get('/documents');
  return response.data.data;
};
```

## 🎨 Component Examples

### Login Component
```javascript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Navigate to dashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

### Chat Component
```javascript
import { useState } from 'react';
import api from '../services/api';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/chat', { message });
      setResponses([...responses, {
        userMessage: message,
        aiResponse: response.data.data,
      }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {responses.map((resp, idx) => (
        <div key={idx}>
          <p><strong>You:</strong> {resp.userMessage}</p>
          <p><strong>AI:</strong> {resp.aiResponse.reply}</p>
          {resp.aiResponse.tasks.length > 0 && (
            <ul>
              {resp.aiResponse.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
```

## 🚀 Running Both Frontend & Backend

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
npm run dev
# Runs on http://localhost:5173 (Vite default)
```

Both servers will run side-by-side and communicate via HTTP requests.

## ✅ Testing the Integration

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: In another terminal `npm run dev`
3. **Open Browser**: http://localhost:5173
4. **Sign Up**: Create an account
5. **Test Chat**: Send a message
6. **Create Task**: Add a new task
7. **Upload Document**: Upload a PDF
8. **Set Reminder**: Create a reminder

## 📊 Response Format Reference

All API responses follow this format:

```javascript
// Success Response
{
  success: true,
  data: { /* actual data */ },
  count: 5 // for list endpoints
}

// Error Response
{
  success: false,
  error: "Error message here"
}
```

## 🛠️ Error Handling

```javascript
try {
  const response = await api.post('/tasks', taskData);
  console.log(response.data.data);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error(error.response.data.error);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Error in request setup
    console.error('Error:', error.message);
  }
}
```

## 🔐 Token Management

Tokens are stored in localStorage and automatically added to all requests:

```javascript
// Token is stored after login
localStorage.setItem('token', response.data.token);

// Token is automatically sent with all requests via axios interceptor
// No need to manually add it to each request!

// On logout
localStorage.removeItem('token');
```

## 📱 Frontend Folder Structure

```
src/
├── services/
│   └── api.js              # Axios configuration
├── hooks/
│   └── useAuth.js          # Authentication hook
├── pages/
│   ├── Dashboard.jsx       # Main dashboard
│   ├── Chat.jsx            # Chat interface
│   ├── Tasks.jsx           # Task management
│   ├── Documents.jsx       # Document upload
│   └── Calendar.jsx        # Reminders/Calendar
├── components/
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   └── TopNavBar.jsx
└── App.jsx
```

---

**Integration complete! Your frontend and backend are now ready to communicate! 🎉**
