# AmoraVerse Vercel Deployment Guide

## 🚀 Deploy to Vercel

### 1. Prerequisites

#### Frontend Configuration
Ensure your project root contains the following files:
- `vercel.json` - Vercel configuration file
- `package.json` - Contains build scripts
- `vite.config.ts` - Vite configuration

#### Environment Variables Configuration
Add the following environment variables in Vercel project settings:

```env
# API Configuration
VITE_API_URL=https://your-vercel-app.vercel.app/api

# Optional API Keys (for fallback services)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database Configuration
DATABASE_URL=sqlite:///data/amora-verse.db

# Model Settings
MODEL_PATH=model/amora-poet-model
```

### 2. Deployment Steps

#### Method 1: Via Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy Project**
```bash
vercel
```

4. **Set Environment Variables**
```bash
vercel env add VITE_API_URL
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
```

#### Method 2: Via GitHub Integration

1. **Push Code to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Import Project in Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure build settings

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Project Structure Configuration

#### Root Directory vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/app.py"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "functions": {
    "backend/app.py": {
      "runtime": "python3.9"
    }
  }
}
```

#### Backend vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ],
  "functions": {
    "app.py": {
      "runtime": "python3.9"
    }
  }
}
```

### 4. Post-Deployment Configuration

#### Update API URL
After deployment, update the API URL in your frontend code:

```typescript
// src/hooks/useAmoraVerseAPI.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-vercel-app.vercel.app/api';
```

#### Verify Deployment
1. Visit your frontend application
2. Test API endpoints
3. Check console for errors

### 5. Troubleshooting Common Issues

#### Issue 1: Build Failure
**Solutions**:
- Check dependencies in `package.json`
- Ensure all dependencies are installed
- Verify build scripts are correct

#### Issue 2: API Routes Not Working
**Solutions**:
- Ensure `vercel.json` configuration is correct
- Check environment variables are properly set
- Verify API endpoint paths

#### Issue 3: Environment Variables Not Loading
**Solutions**:
- Re-set environment variables in Vercel project settings
- Ensure variable names start with `VITE_` (for frontend use)
- Redeploy the project

### 6. Performance Optimization

#### Frontend Optimization
- Enable Vite code splitting
- Use CDN for static assets
- Optimize images and font loading

#### Backend Optimization
- Use Vercel edge functions
- Implement caching strategies
- Optimize database queries

### 7. Monitoring and Maintenance

#### Setup Monitoring
- Configure Vercel Analytics
- Set up error monitoring
- Monitor API response times

#### Regular Maintenance
- Update dependencies
- Check for security vulnerabilities
- Optimize performance

## 🎉 Deployment Complete

After successful deployment, your AmoraVerse application will be available at:
- **Frontend**: `https://your-vercel-app.vercel.app`
- **API**: `https://your-vercel-app.vercel.app/api`

### Next Steps
1. Configure custom domain (optional)
2. Set up CI/CD pipeline
3. Configure monitoring and logging
4. Implement security best practices 