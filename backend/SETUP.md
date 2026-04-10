# Complete Setup Guide - AI Life Admin Assistant Backend

## 🎯 Quick Start (5 minutes)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Run Setup Script

**Windows:**
```cmd
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup (if scripts don't work):**
```bash
npm install
cp .env.example .env
mkdir -p uploads
```

### Step 3: Configure Environment Variables
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/ai-life-admin
JWT_SECRET=your_super_secret_key_here
OPENAI_API_KEY=sk-your-key-here (optional)
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

✅ Server running at: **http://localhost:5000**

---

## 📋 Detailed Installation

### Prerequisites Check

```bash
# Check Node.js
node --version  # Should be v16+

# Check npm
npm --version   # Should be v7+
```

### Install Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `multer` - File upload handling
- `pdf-parse` - PDF processing
- `nodemon` - Auto-reload (dev)

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB Community Server from: https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows: Use MongoDB Compass or Services
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-life-admin
```

### Environment Configuration

Create `.env` file in `backend/` directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-life-admin

# JWT Configuration
JWT_SECRET=change_this_to_a_random_string_in_production
JWT_EXPIRE=7d

# OpenAI API (optional - has mock fallback)
OPENAI_API_KEY=sk-your-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (for frontend)
CORS_ORIGIN=http://localhost:5173
```

### Start Server

```bash
# Development mode (auto-reload on file changes)
npm run dev

# Production mode
npm start
```

Expected output:
```
[INFO] 2024-01-15T10:30:45.123Z - ✅ MongoDB connected successfully
[INFO] 2024-01-15T10:30:45.234Z - ✅ Server running on http://localhost:5000
[INFO] 2024-01-15T10:30:45.235Z - 📌 CORS enabled for: http://localhost:5173
```

---

## 🧪 Testing the Backend

### Health Check
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "success": true,
  "message": "🚀 AI Life Admin Assistant Backend is running!"
}
```

### Sign Up New User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
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
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task (with token)
```bash
# Replace YOUR_TOKEN with the token from signup/login
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the hackathon",
    "priority": "high",
    "dueDate": "2024-04-15"
  }'
```

### Send Chat Message (with token)
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "message": "Help me organize my day"
  }'
```

---

## 🏗️ Project Structure

```
backend/
├── config/
│   ├── db.js                      # MongoDB connection
│   └── logger.js                  # Logging utility
│
├── middleware/
│   ├── auth.js                    # JWT authentication
│   └── errorHandler.js            # Global error handling
│
├── models/
│   ├── User.js                    # User schema
│   ├── Task.js                    # Task schema
│   ├── Reminder.js                # Reminder schema
│   └── Document.js                # Document schema
│
├── controllers/
│   ├── authController.js          # Auth logic
│   ├── chatController.js          # Chat logic
│   ├── documentController.js      # Document logic
│   ├── taskController.js          # Task logic
│   └── reminderController.js      # Reminder logic
│
├── routes/
│   ├── auth.js                    # Auth routes
│   ├── chat.js                    # Chat routes
│   ├── tasks.js                   # Task routes
│   ├── reminders.js               # Reminder routes
│   └── documents.js               # Document routes
│
├── services/
│   ├── chatService.js             # AI chat integration
│   └── documentService.js         # Document processing
│
├── utils/
│   └── logger.js                  # Logger utility
│
├── uploads/                       # User uploaded files
├── .env.example                   # Env variables template
├── .gitignore                     # Git ignore rules
├── server.js                      # Main server file
├── package.json                   # Dependencies
├── README.md                      # Backend documentation
├── FRONTEND_INTEGRATION.md        # Integration guide
└── SETUP.md                       # This file
```

---

## 🔌 API Endpoints Quick Reference

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | `/api/auth/signup` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/chat` | ✅ | Send chat message |
| POST | `/api/documents/upload` | ✅ | Upload document |
| GET | `/api/documents` | ✅ | Get user documents |
| GET | `/api/documents/:id` | ✅ | Get specific document |
| DELETE | `/api/documents/:id` | ✅ | Delete document |
| GET | `/api/tasks` | ✅ | Get all tasks |
| POST | `/api/tasks` | ✅ | Create task |
| GET | `/api/tasks/:id` | ✅ | Get specific task |
| PUT | `/api/tasks/:id` | ✅ | Update task |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| GET | `/api/reminders` | ✅ | Get all reminders |
| POST | `/api/reminders` | ✅ | Create reminder |
| GET | `/api/reminders/:id` | ✅ | Get specific reminder |
| PUT | `/api/reminders/:id` | ✅ | Update reminder |
| DELETE | `/api/reminders/:id` | ✅ | Delete reminder |

---

## 🐛 Troubleshooting

### Connection Refused (ECONNREFUSED)
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** MongoDB is not running
```bash
# Start MongoDB
# Windows: Services or MongoDB Compass
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change PORT in `.env` or kill the process
```bash
# Find process on port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill it
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### MongoDB Atlas Connection
```
MongoServerSelectionError: Cannot create servers that do not have a host
```
**Solution:** Check connection string format
```env
# Correct format:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-life-admin

# Note: Make sure username and password are URL-encoded if they contain special characters
```

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `CORS_ORIGIN` in `.env`
```env
# For localhost frontend
CORS_ORIGIN=http://localhost:5173
CORS_ORIGIN=http://localhost:3000  # If using different port
```

### JWT Token Error
```
Not authorized to access this route
```
**Solution:** Ensure token is sent in header
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/api/tasks
```

---

## 📈 Performance Tips

1. **Database Indexing**: Mongoose automatically creates indexes on `_id`
2. **Pagination**: Add pagination for large queries
3. **Caching**: Consider Redis for session caching
4. **Rate Limiting**: Add rate limiting for production
5. **Compression**: Enable gzip compression

---

## 🔒 Security Checklist

- ✅ Environment variables for sensitive data
- ✅ Password hashing with bcryptjs
- ✅ JWT for authentication
- ✅ CORS for cross-origin requests
- ✅ Input validation
- ✅ File type validation on uploads
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: HTTPS in production
- ⚠️ TODO: Database encryption

---

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Mongoose Guide](https://mongoosejs.com/)
- [Multer Upload](https://github.com/expressjs/multer)

---

## 🎉 You're All Set!

Backend is ready! Next steps:
1. ✅ Backend running
2. ⏭️ Connect your React frontend (see FRONTEND_INTEGRATION.md)
3. ⏭️ Add OpenAI API key for real AI responses
4. ⏭️ Deploy to production

**Happy coding! 🚀**
