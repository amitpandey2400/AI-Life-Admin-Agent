# Railway Deployment Guide

This guide will help you deploy your AI Life Admin Assistant to Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Git Repository**: Your project must be in a Git repository (GitHub, GitLab, or Gitea)
3. **MongoDB**: You'll need MongoDB for the database

## Step 1: Prepare Your Project

Your project is already configured! The following files have been created:

- `Procfile` - Deployment configuration
- `railway.json` - Railway-specific settings
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- Updated `package.json` - Build scripts
- Updated `backend/server.js` - Frontend serving

## Step 2: Push to Git Repository

```bash
git add .
git commit -m "Setup for Railway deployment"
git push
```

## Step 3: Set Up MongoDB on Railway

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Click "Add Service"
4. Select "Database" → "MongoDB"
5. Wait for MongoDB to be provisioned
6. Click on the MongoDB service → "Connect"
7. Copy the connection URI

## Step 4: Deploy Your Backend + Frontend

1. In your Railway project, click "Add Service"
2. Select "GitHub Repo" (or your Git provider)
3. Select your repository
4. Railway will automatically detect and use your `Procfile`
5. Click "Deploy"

## Step 5: Configure Environment Variables

1. Go to your Railway project
2. Click on your app service
3. Go to "Variables" tab
4. Add the following variables:

```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/ai-life-admin
NODE_ENV=production
CORS_ORIGIN=https://your-app-name.up.railway.app
JWT_SECRET=generate-a-strong-random-string-here
PORT=5000
```

### Generating a Strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: Get Your Connection String

1. Go to your MongoDB service in Railway
2. Click the service → "Connect" tab
3. Copy the connection string (it looks like: `mongodb+srv://...`)
4. Add it as `MONGODB_URI` in your app's Variables

## Step 7: Monitor Your Deployment

1. Click on your app service in Railway
2. Go to "Deployments" tab
3. Watch the build and deployment logs
4. Once deployment is complete, you'll see a green checkmark

## Step 8: Access Your App

Once deployed, Railway will give you a URL like:
```
https://your-app-name.up.railway.app
```

Your app will:
- Serve the React frontend at the root path (`/`)
- Serve API routes at `/api/*`
- Connect to MongoDB automatically

## Troubleshooting

### Build Fails
- Check logs in Railway dashboard
- Ensure all dependencies are listed in `package.json` and `backend/package.json`

### App Won't Start
- Check `PORT` environment variable is set
- Verify `MONGODB_URI` is correct
- Check app logs in Railway dashboard

### CORS Errors
- Update `CORS_ORIGIN` to match your Railway app URL
- Example: `https://your-app-name.up.railway.app`

### MongoDB Connection Issues
- Verify `MONGODB_URI` in Variables
- Check MongoDB service is running (green status)
- Add your Railway IP to MongoDB whitelist if needed

## Redeploy After Changes

Simply push to your Git repository:
```bash
git push
```

Railway will automatically redeploy your app!

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm run install-all

# Start frontend (dev server)
npm run dev

# In another terminal, start backend
npm run dev:backend
```

## Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway GitHub Integration](https://docs.railway.app/guides/github)
- [Environment Variables Guide](https://docs.railway.app/develop/variables)

---

**Questions?** Contact Railway support at [support.railway.app](https://support.railway.app)
