# API Cheat Sheet - AI Life Admin Assistant

Quick reference for all API endpoints and usage examples.

## 🔐 Authentication

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a3b2e1c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

---

## 💬 Chat

### Send Message
```bash
POST /api/chat
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "message": "Help me organize my tasks for today"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reply": "Main samjh gaya! Aapke tasks ko organize karna hai...",
    "tasks": [
      "First, list all your tasks",
      "Then prioritize them",
      "Set deadlines for each"
    ]
  }
}
```

---

## 📝 Tasks

### Get All Tasks
```bash
GET /api/tasks
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a3b2e1c1234567890abcde",
      "userId": "65a3b1e1c1234567890abcde",
      "title": "Complete project",
      "description": "Finish the hackathon project",
      "completed": false,
      "priority": "high",
      "dueDate": "2024-04-15T00:00:00.000Z",
      "category": "work",
      "createdAt": "2024-01-15T10:30:45.123Z",
      "updatedAt": "2024-01-15T10:30:45.123Z"
    }
  ]
}
```

### Create Task
```bash
POST /api/tasks
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Get milk, bread, eggs",
  "priority": "medium",
  "dueDate": "2024-01-20T18:00:00Z",
  "category": "personal"
}
```

### Get Single Task
```bash
GET /api/tasks/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
```

### Update Task
```bash
PUT /api/tasks/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Buy groceries (updated)",
  "completed": true,
  "priority": "low"
}
```

### Delete Task
```bash
DELETE /api/tasks/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
```

---

## ⏰ Reminders

### Get All Reminders
```bash
GET /api/reminders
Authorization: Bearer YOUR_TOKEN
```

### Create Reminder
```bash
POST /api/reminders
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Weekly standup with the team",
  "date": "2024-01-18T10:00:00Z",
  "priority": "high"
}
```

### Update Reminder
```bash
PUT /api/reminders/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Team Meeting (Room 302)",
  "notified": true
}
```

### Delete Reminder
```bash
DELETE /api/reminders/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
```

---

## 📄 Documents

### Upload Document
```bash
POST /api/documents/upload
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

form-data:
  document: <file.pdf>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "65a3b2e1c1234567890abcde",
    "filename": "contract.pdf",
    "summary": "This is a service agreement between two parties...",
    "important_points": [
      "Service duration: 12 months",
      "Payment terms: Monthly",
      "Renewal date: January 2025"
    ],
    "deadlines": [
      "2025-01-15T00:00:00.000Z"
    ]
  }
}
```

### Get All Documents
```bash
GET /api/documents
Authorization: Bearer YOUR_TOKEN
```

### Get Single Document
```bash
GET /api/documents/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
```

### Delete Document
```bash
DELETE /api/documents/65a3b2e1c1234567890abcde
Authorization: Bearer YOUR_TOKEN
```

---

## 🔄 Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { /* actual data */ },
  "count": 5
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🔑 Token Usage

All protected endpoints require JWT token in Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token structure in localStorage (frontend):
```javascript
// After login/signup, save token
localStorage.setItem('token', response.data.token);

// Use in requests
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`
};
```

---

## 💡 Common Patterns

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usage
const response = await api.post('/chat', { message: 'Hello' });
console.log(response.data.data);
```

### React Hook
```javascript
import { useState } from 'react';

function useApiCall(url, method = 'GET') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (payload) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: payload ? JSON.stringify(payload) : undefined
      });
      
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}
```

### Task Creation Example
```javascript
// POST /api/tasks
const taskData = {
  title: "Learn Hinglish",
  description: "Master the art of Hinglish communication",
  priority: "high",
  dueDate: new Date().toISOString(),
  category: "learning"
};

const response = await api.post('/tasks', taskData);
```

---

## 📊 Enum Values

### Task Priority
- `low`
- `medium`
- `high`

### Task Category
- `work`
- `personal`
- `health`
- `finance`
- `general` (default)

### Reminder Priority
- `low`
- `medium`
- `high`

### Document MIME Types (Accepted)
- `application/pdf`
- `text/plain`
- `text/csv`
- `application/json`

---

## 🧪 Testing with cURL

### Test Health
```bash
curl http://localhost:5000/health
```

### Get All Tasks
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/tasks
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Task",
    "priority": "high"
  }'
```

### Upload Document
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "document=@/path/to/file.pdf"
```

---

## 🚨 Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Not authorized` | Missing/invalid token | Add valid JWT token in header |
| `Not found` | Resource doesn't exist | Check resource ID |
| `Invalid credentials` | Wrong email/password | Verify login credentials |
| `Duplicate field` | Email already exists | Use unique email for signup |
| `Invalid file type` | Wrong document format | Upload PDF/TXT/CSV/JSON only |
| `Port already in use` | Port 5000 already occupied | Change PORT in .env |

---

## 📚 Reference Links

- Base URL: `http://localhost:5000`
- API Base: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/health`

---

**Last Updated:** January 2024
**Version:** 1.0.0
