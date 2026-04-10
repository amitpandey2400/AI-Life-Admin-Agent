# API Integration Complete ✅

This document outlines the full API integration between the frontend and backend with OpenAI chat functionality.

## What's Been Connected

### ✅ **Backend API Setup**
- OpenAI integration for AI Chat
- JWT Authentication
- MongoDB Models for Users, Tasks, Reminders, Documents
- Express API with CORS enabled
- Environment variables configured

### ✅ **Frontend API Client**
- Created `src/services/apiClient.js` - Universal API client
- Supports Auth, Tasks, Reminders, Documents, and Chat
- Automatic JWT token management
- Error handling built in

### ✅ **Frontend Pages - Now Connected to Backend**

1. **Tasks.jsx**
   - ✅ Fetches tasks from backend
   - ✅ Create new tasks
   - ✅ Mark tasks complete/incomplete
   - ✅ Delete tasks
   - ✅ Real-time UI updates

2. **Chat.jsx**
   - ✅ Send messages to backend
   - ✅ Receives AI responses from OpenAI
   - ✅ Chat history in UI
   - ✅ Loading states with animations
   - ✅ Message timestamps

3. **Documents.jsx**
   - ✅ Upload files to backend
   - ✅ View uploaded documents
   - ✅ Delete documents
   - ✅ File type support: PDF, DOCX, XLSX, Images

---

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `axios` - For API calls to OpenAI
- `openai` - OpenAI SDK

### 2. Environment Variables

**Backend (backend/.env)**
```
MONGODB_URI=mongodb://localhost:27017/ai-life-admin
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENAI_API_KEY=sk-proj-YOUR_OPENAI_API_KEY_HERE
OPENAI_MODEL=gpt-3.5-turbo
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI to your connection string
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000`

### 5. Start the Frontend

```bash
# In another terminal (from root directory)
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Endpoints Available

### Authentication
- `POST /api/auth/signup` - Sign up new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Reminders
- `GET /api/reminders` - Get all reminders (protected)
- `POST /api/reminders` - Create reminder (protected)
- `PUT /api/reminders/:id` - Update reminder (protected)
- `DELETE /api/reminders/:id` - Delete reminder (protected)

### Documents
- `GET /api/documents` - Get all documents (protected)
- `POST /api/documents` - Create document (protected)
- `POST /api/documents/upload` - Upload file (protected)
- `DELETE /api/documents/:id` - Delete document (protected)

### Chat (AI)
- `POST /api/chat` - Send message and get AI response (protected)

---

## How Authentication Works

1. **Login/SignUp**: User enters email and password
2. **Backend**: Validates and returns JWT token
3. **Frontend**: Stores token in localStorage
4. **API Calls**: Token sent in `Authorization: Bearer <token>` header
5. **Protected Routes**: Backend middleware verifies token before processing

---

## OpenAI Integration

### How Chat Works

```
User Message → Frontend
   ↓
POST /api/chat with message
   ↓
Backend chatController
   ↓
Calls OpenAI API with conversation context
   ↓
OpenAI returns response
   ↓
Backend returns to Frontend
   ↓
Frontend displays AI response
```

### API Key Security

⚠️ **IMPORTANT**: The OpenAI API key is in `backend/.env`

**In Production (Railway):**
1. DO NOT commit `.env` file
2. Add `OPENAI_API_KEY` to Railway environment variables
3. Update `CORS_ORIGIN` to your Railway app URL

---

## Testing the Integration

### Test Tasks
1. Go to `http://localhost:5173`
2. Click "Tasks" in sidebar
3. Enter a task title and click Add
4. Should create task in MongoDB and display immediately

### Test Chat
1. Go to Chat page
2. Type any message
3. Hit Send
4. AI should respond using OpenAI API
5. Response displays in real-time

### Test Documents
1. Go to Documents page
2. Click "Upload File" or drag-drop
3. Select a PDF/Image/Document
4. File uploads and displays

---

## Troubleshooting

### "API request failed" error
- Check backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS is enabled in backend

### Chat not working
- Verify `OPENAI_API_KEY` is set correctly in `backend/.env`
- Check OpenAI API key is valid at https://platform.openai.com
- Look at backend console for error details

### Tasks not saving
- Ensure MongoDB is running
- Check MongoDB connection string in `backend/.env`
- Look at browser DevTools Network tab for details

### "Not authorized" error
- User needs to login first
- JWT token must be sent in header
- Token might be expired

---

## Next Steps

1. **Deploy to Railway**: Follow `RAILWAY_DEPLOYMENT.md`
2. **Add Authentication UI**: Create Login/Signup pages
3. **Add Reminders Page**: Connect reminders to backend
4. **Add Calendar View**: Integrate calendar library
5. **Enhance Chat**: Add conversation history persistence
6. **Add Notifications**: Real-time task/reminder alerts

---

## File Structure

```
src/
├── services/
│   └── apiClient.js          ← API client (new)
├── pages/
│   ├── Tasks.jsx             ← Connected to API ✅
│   ├── Chat.jsx              ← Connected to OpenAI ✅
│   ├── Documents.jsx         ← File upload connected ✅
│   ├── Dashboard.jsx
│   └── Calendar.jsx

backend/
├── .env                       ← Your API keys (NEW)
├── services/
│   ├── aiService.js          ← OpenAI integration (new)
│   └── chatService.js
├── controllers/
│   ├── chatController.js
│   ├── taskController.js
│   └── ...
└── routes/
    ├── chat.js
    ├── tasks.js
    └── ...
```

---

## Summary

✅ **Backend**: Fully connected with OpenAI
✅ **Frontend**: All API calls implemented
✅ **Environment**: Configured with your API key
✅ **Ready to**: Deploy to Railway

Start the services and test! 🚀
