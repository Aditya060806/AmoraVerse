# 🚀 AmoraVerse Quick Deployment Guide

## One-Click Deploy to Vercel

### Method 1: Using Deployment Script (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Run Deployment Script**
```bash
npm run deploy
```

### Method 2: Manual Deployment

1. **Build Project**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

3. **Configure Environment Variables**
Add in Vercel project settings:
- `VITE_API_URL` = `https://your-app.vercel.app/api`

## 📋 Deployment Checklist

### ✅ Pre-Deployment Checks
- [ ] All code committed to Git
- [ ] Vercel CLI installed
- [ ] Logged into Vercel account
- [ ] Project builds successfully

### ✅ Post-Deployment Configuration
- [ ] Environment variables set
- [ ] API endpoints tested
- [ ] Frontend functionality verified
- [ ] Console errors checked

## 🔧 Environment Variables Configuration

Add the following environment variables in Vercel project settings:

```env
# Required
VITE_API_URL=https://your-app.vercel.app/api

# Optional (for fallback AI services)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## 🌐 Access Your Application

After successful deployment, your application will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api`

## 🆘 Common Issues

### Build Failure
```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Not Working
- Check `vercel.json` configuration
- Verify environment variable settings
- Confirm API route paths

### Environment Variables Not Taking Effect
- Redeploy the project
- Check variable names are correct
- Ensure variables start with `VITE_`

## 📞 Get Help

If you encounter issues, check:
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
2. [README.md](./README.md) - Project documentation
3. Vercel console logs 