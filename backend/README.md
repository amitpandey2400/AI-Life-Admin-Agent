# AI Life Admin Assistant - Backend

Complete backend for the AI Life Admin Assistant web application.

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── chatController.js     # Chat message handling
│   ├── documentController.js # Document upload & processing
│   ├── taskController.js     # Task management
│   └── reminderController.js # Reminder management
├── models/
│   ├── User.js               # User schema
│   ├── Task.js               # Task schema
│   ├── Reminder.js           # Reminder schema
│   └── Document.js           # Document schema
├── middleware/
│   ├── auth.js               # JWT authentication
│   └── errorHandler.js       # Global error handler
├── routes/
│   ├── auth.js               # Auth endpoints
│   ├── chat.js               # Chat endpoint
│   ├── tasks.js              # Task endpoints
│   ├── reminders.js          # Reminder endpoints
│   └── documents.js          # Document endpoints
├── services/
│   ├── chatService.js        # AI chat integration
│   └── documentService.js    # Document processing
├── utils/
│   └── logger.js             # Logging utility
├── uploads/                  # Uploaded files directory
├── .env.example              # Environment variables template
├── server.js                 # Main server file
└── package.json              # Dependencies
```

## 🚀 Setup Instructions

### 1️⃣ Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### 2️⃣ Installation

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

### 3️⃣ Environment Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-life-admin
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-life-admin

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# OpenAI API (Optional - has mock fallback)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 4️⃣ Start Development Server

With nodemon (auto-reload):
```bash
npm run dev
```

Or production:
```bash
npm start
```

Server will start at: **http://localhost:5000**

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Chat
- `POST /api/chat` - Send message to AI (protected)

### Documents
- `POST /api/documents/upload` - Upload document (protected)
- `GET /api/documents` - Get user's documents (protected)
- `GET /api/documents/:id` - Get specific document (protected)
- `DELETE /api/documents/:id` - Delete document (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get specific task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Reminders
- `GET /api/reminders` - Get all reminders (protected)
- `POST /api/reminders` - Create new reminder (protected)
- `GET /api/reminders/:id` - Get specific reminder (protected)
- `PUT /api/reminders/:id` - Update reminder (protected)
- `DELETE /api/reminders/:id` - Delete reminder (protected)

## 📡 Request Examples

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Send Chat Message
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "Help me organize my tasks"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the hackathon project",
    "priority": "high",
    "dueDate": "2024-04-15"
  }'
```

### Upload Document
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "document=@file.pdf"
```

## ✨ Features

✅ **JWT Authentication** - Secure user authentication
✅ **Chat System** - AI-powered chat with task breakdown & Hinglish support
✅ **Document Processing** - Extract text, summaries, and deadlines from PDFs
✅ **Task Management** - Full CRUD operations for tasks
✅ **Reminders** - Create and manage reminders with deadlines
✅ **Error Handling** - Comprehensive error handling middleware
✅ **CORS Enabled** - Ready for frontend integration
✅ **Logging** - Simple logging system for debugging
✅ **File Upload** - Secure file upload with multer
✅ **Password Hashing** - bcryptjs for password security

## 🔒 Security Features

- ✅ JWT tokens for authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Input validation
- ✅ Authorization checks on protected routes
- ✅ File type validation on uploads

## 📝 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  priority: String (low/medium/high),
  dueDate: Date,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reminder
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  date: Date,
  notified: Boolean,
  priority: String (low/medium/high),
  createdAt: Date,
  updatedAt: Date
}
```

### Document
```javascript
{
  userId: ObjectId,
  filename: String,
  filepath: String,
  mimetype: String,
  summary: String,
  importantPoints: [String],
  deadlines: [Date],
  extractedText: String,
  processed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧠 AI Features

### Chat Service
- Breaks down complex tasks into actionable steps
- Responds in Hinglish (mix of Hindi and English)
- Returns structured JSON with reply and tasks
- Has mock fallback for development without OpenAI key

### Document Service
- Extracts text from PDFs
- Generates summaries
- Extracts important points
- Identifies deadline dates

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or MongoDB Atlas connection string is correct
- Check `MONGODB_URI` in `.env`

### CORS Error
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Default: `http://localhost:5173`

### JWT Token Errors
- Ensure `JWT_SECRET` in `.env` is set
- Check token format: `Bearer <token>`

### File Upload Issues
- Ensure `uploads/` directory exists
- Check file size limits in multer configuration

## 📚 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: multer
- **PDF Processing**: pdf-parse
- **Development**: nodemon

## 🎯 Next Steps

1. Integrate with your React frontend
2. Add OpenAI API key for real AI responses
3. Connect MongoDB Atlas for production
4. Implement email notifications for reminders
5. Add task scheduling/automation
6. Implement real-time notifications with WebSockets

## 📄 License

MIT License

---

**Ready to run! 🚀**
