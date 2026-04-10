#!/bin/bash

# AI Life Admin Assistant - Quick Setup Script

echo "🚀 AI Life Admin Assistant - Backend Setup"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env with your configuration (MongoDB URI, JWT secret, etc.)"
else
    echo "✅ .env file already exists"
fi

# Create uploads directory if it doesn't exist
if [ ! -d uploads ]; then
    echo ""
    echo "📁 Creating uploads directory..."
    mkdir -p uploads
    echo "✅ uploads directory created"
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file with your configuration"
echo "2. Ensure MongoDB is running"
echo "3. Run 'npm start' or 'npm run dev' to start the server"
echo ""
echo "💡 Start Development Server:"
echo "   npm run dev"
echo ""
echo "🌐 Production Server:"
echo "   npm start"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Backend API documentation"
echo "   - FRONTEND_INTEGRATION.md - Frontend integration guide"
echo ""
