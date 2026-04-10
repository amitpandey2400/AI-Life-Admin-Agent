@echo off
REM AI Life Admin Assistant - Quick Setup Script for Windows

echo.
echo 🚀 AI Life Admin Assistant - Backend Setup
echo ==========================================

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node -v
echo ✅ npm version:
npm -v

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo.
    echo 📝 Creating .env file from template...
    copy .env.example .env >nul
    echo ✅ .env file created
    echo ⚠️  Please edit .env with your configuration
) else (
    echo ✅ .env file already exists
)

REM Create uploads directory if it doesn't exist
if not exist uploads (
    echo.
    echo 📁 Creating uploads directory...
    mkdir uploads
    echo ✅ uploads directory created
)

echo.
echo ==========================================
echo ✅ Setup Complete!
echo ==========================================
echo.
echo 📋 Next Steps:
echo 1. Edit .env file with your configuration
echo 2. Ensure MongoDB is running
echo 3. Run 'npm start' or 'npm run dev' to start the server
echo.
echo 💡 Start Development Server:
echo    npm run dev
echo.
echo 🌐 Production Server:
echo    npm start
echo.
echo 📚 Documentation:
echo    - README.md - Backend API documentation
echo    - FRONTEND_INTEGRATION.md - Frontend integration guide
echo.
pause
